use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use axum::{
    extract,
    response::{IntoResponse, Response},
    routing::{get, get_service, post},
    Json, Router,
};
use bb8::Pool;
use bb8_postgres::PostgresConnectionManager;
use dotenv::dotenv;
use http::{Method, StatusCode};
use openssl::ssl::{SslConnector, SslMethod};
use postgres_openssl::MakeTlsConnector;
use serde::{Deserialize, Serialize};
use tower_http::{
    cors::{Any, CorsLayer},
    services::ServeDir,
};

enum RegisterErrorCode {
    PasswordConfirmationNotFound,
    PasswordDoesNotMatch,
    NeedRegistrationCode,
    WrongRegistrationCode,
}

enum LoginErrorCode {
    LoginFailed,
    UsernameOrPasswordNotFound,
}

enum ErrorCode {
    Register(RegisterErrorCode),
    Login(LoginErrorCode),
    SomethingWentWrong,
}

#[derive(Serialize)]
struct ErrorResponse {
    error_code: String,
}

impl IntoResponse for ErrorCode {
    fn into_response(self) -> Response {
        let error_code = match self {
            ErrorCode::SomethingWentWrong => "SOMETHING_WENT_WRONG",
            ErrorCode::Register(register) => match register {
                RegisterErrorCode::PasswordConfirmationNotFound => {
                    "PASSWORD_CONFIRMATION_NOT_FOUND"
                }
                RegisterErrorCode::PasswordDoesNotMatch => "PASSWORD_DOES_NOT_MATCH",
                RegisterErrorCode::NeedRegistrationCode => "NEED_REGISTRATION_CODE",
                RegisterErrorCode::WrongRegistrationCode => "WRONG_REGISTRATION_CODE",
            },
            ErrorCode::Login(login) => match login {
                LoginErrorCode::LoginFailed => "LOGIN_FAILED",
                LoginErrorCode::UsernameOrPasswordNotFound => "USERNAME_OR_PASSWORD_NOT_FOUND",
            },
        };

        let body = ErrorResponse {
            error_code: error_code.to_string(),
        };

        // its often easiest to implement `IntoResponse` by calling other implementations
        (StatusCode::INTERNAL_SERVER_ERROR, Json(body)).into_response()
    }
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    let connection_string = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let builder = SslConnector::builder(SslMethod::tls()).unwrap();
    let connector = MakeTlsConnector::new(builder.build());

    let cors = CorsLayer::new()
        .allow_methods(vec![Method::GET, Method::POST])
        // .allow_origin("http://localhost:3001".parse::<HeaderValue>().unwrap());
        .allow_origin(Any);

    let manager =
        PostgresConnectionManager::new_from_stringlike(connection_string, connector).unwrap();

    let pool = Pool::builder().build(manager).await.unwrap();

    // static assets handler
    let assets_handle = get_service(ServeDir::new("./static/assets")).handle_error(handle_error);

    let app = Router::new()
        .nest_service("/assets", assets_handle)
        .route(
            "/",
            get(using_connection_pool_extractor).post(using_connection_pool_extractor),
        )
        .route("/register", post(register))
        .route("/login", post(login))
        .layer(cors)
        .with_state(pool);

    let app = app.fallback(handler_404);
    println!("Http Server started on 0.0.0.0:3000");
    hyper::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

type ConnectionPool = Pool<PostgresConnectionManager<MakeTlsConnector>>;

async fn using_connection_pool_extractor(
    extract::State(pool): extract::State<ConnectionPool>,
) -> Result<String, (StatusCode, ErrorCode)> {
    let conn = pool.get().await.map_err(internal_error)?;
    let row = conn
        .query_one("select * from playing_with_neon limit 1", &[])
        .await
        .map_err(internal_error)?;
    let two: String = row.try_get(0).map_err(internal_error)?;

    Ok(two.to_string())
}

fn internal_error<E>(_err: E) -> (StatusCode, ErrorCode)
where
    E: std::error::Error,
{
    println!("Error: {}", _err);
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        ErrorCode::SomethingWentWrong,
    )
}

#[derive(Deserialize)]
struct RegisterForm {
    username: String,
    password: String,
    confirm_password: Option<String>,
    registration_code: Option<String>,
}

async fn register(
    extract::State(pool): extract::State<ConnectionPool>,
    extract::Form(form): extract::Form<RegisterForm>,
) -> Result<String, (StatusCode, ErrorCode)> {
    let registration_code_env =
        std::env::var("REGISTRATION_CODE").expect("REGISTRATION_CODE must be set");

    match form.confirm_password.to_owned() {
        None => {
            return Err((
                StatusCode::UNAUTHORIZED,
                ErrorCode::Register(RegisterErrorCode::PasswordConfirmationNotFound),
            ))
        }
        Some(confirm_password) => {
            if confirm_password != form.password {
                return Err((
                    StatusCode::UNAUTHORIZED,
                    ErrorCode::Register(RegisterErrorCode::PasswordDoesNotMatch),
                ));
            }
        }
    }

    match form.registration_code.to_owned() {
        None => {
            return Err((
                StatusCode::UNAUTHORIZED,
                ErrorCode::Register(RegisterErrorCode::NeedRegistrationCode),
            ))
        }
        Some(code) => {
            if code != registration_code_env {
                return Err((
                    StatusCode::UNAUTHORIZED,
                    ErrorCode::Register(RegisterErrorCode::WrongRegistrationCode),
                ));
            }
        }
    }

    let password = form.password.as_bytes();
    let salt = SaltString::generate(&mut OsRng);

    let argon2 = Argon2::default();

    let password_hash = argon2.hash_password(password, &salt).unwrap().to_string();

    let conn = pool.get().await.map_err(internal_error)?;

    conn.query(
        "INSERT INTO app_user(username, password_hash) VALUES ($1, $2)",
        &[&form.username, &password_hash],
    )
    .await
    .map_err(internal_error)?;

    Ok("ok".to_string())
}

#[derive(Deserialize)]
struct LoginForm {
    username: String,
    password: String,
}

async fn login(
    extract::State(pool): extract::State<ConnectionPool>,
    extract::Form(form): extract::Form<LoginForm>,
) -> Result<String, (StatusCode, ErrorCode)> {
    let conn = pool.get().await.map_err(internal_error)?;

    let raw_query = conn
        .query_one(
            "select password_hash from app_user where username = $1 limit 1",
            &[&form.username],
        )
        .await;

    let row = match raw_query {
        Ok(row) => row,
        Err(_err) => {
            // TODO: handle DbError separately
            // let err =_err.as_db_error();
            return Err((
                StatusCode::UNAUTHORIZED,
                ErrorCode::Login(LoginErrorCode::UsernameOrPasswordNotFound),
            ));
        }
    };

    // verify
    let password_hash: String = row.try_get(0).map_err(internal_error)?;
    let parsed_hash = PasswordHash::new(&password_hash).unwrap();

    let result = Argon2::default().verify_password(form.password.as_bytes(), &parsed_hash);

    if result.is_ok() {
        Ok("ok".to_string())
    } else {
        Err((
            StatusCode::UNAUTHORIZED,
            ErrorCode::Login(LoginErrorCode::LoginFailed),
        ))
    }
}

async fn handler_404() -> impl IntoResponse {
    (StatusCode::NOT_FOUND, "nothing to see here")
}

async fn handle_error(_err: std::io::Error) -> impl IntoResponse {
    (StatusCode::INTERNAL_SERVER_ERROR, "Something went wrong...")
}
