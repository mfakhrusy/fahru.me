use axum::{
    extract,
    response::IntoResponse,
    routing::{get, get_service, post},
    Router,
};
use bb8::Pool;
use bb8_postgres::PostgresConnectionManager;
use dotenv::dotenv;
use http::StatusCode;
use openssl::ssl::{SslConnector, SslMethod};
use postgres_openssl::MakeTlsConnector;
use serde::{Deserialize, Serialize};

use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use tower_http::services::ServeDir;

#[tokio::main]
async fn main() {
    dotenv().ok();
    let connection_string = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let builder = SslConnector::builder(SslMethod::tls()).unwrap();
    let connector = MakeTlsConnector::new(builder.build());

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
) -> Result<String, (StatusCode, String)> {
    let conn = pool.get().await.map_err(internal_error)?;
    let row = conn
        .query_one("select * from playing_with_neon limit 1", &[])
        .await
        .map_err(internal_error)?;
    let two: String = row.try_get(0).map_err(internal_error)?;

    Ok(two.to_string())
}

fn internal_error<E>(err: E) -> (StatusCode, String)
where
    E: std::error::Error,
{
    println!("{}", err.to_string());
    (StatusCode::INTERNAL_SERVER_ERROR, err.to_string())
}

#[derive(Deserialize, Debug)]
struct RegisterForm {
    username: String,
    password: String,
    confirm_password: Option<String>,
    registration_code: Option<String>,
}

async fn register(
    extract::State(pool): extract::State<ConnectionPool>,
    extract::Form(form): extract::Form<RegisterForm>,
) -> Result<String, (StatusCode, String)> {
    println!("{:?}", form);
    let registration_code_env =
        std::env::var("REGISTRATION_CODE").expect("REGISTRATION_CODE must be set");

    match form.confirm_password {
        None => {
            return Err((
                StatusCode::UNAUTHORIZED,
                "Password confirmation not found".to_string(),
            ))
        }
        Some(confirm_password) => {
            if confirm_password != form.password {
                return Err((
                    StatusCode::UNAUTHORIZED,
                    "Password doesn't match".to_string(),
                ));
            }
        }
    }

    match form.registration_code {
        None => {
            return Err((
                StatusCode::UNAUTHORIZED,
                "Need registration code to register".to_string(),
            ))
        }
        Some(code) => {
            if code != registration_code_env {
                return Err((
                    StatusCode::UNAUTHORIZED,
                    "Wrong registration code".to_string(),
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

    // verify
    // let parsed_hash = PasswordHash::new(&password_hash).unwrap();

    // assert!(Argon2::default().verify_password(password, &parsed_hash).is_ok());

    // println!("hash: {}, salt: {}", password_hash, salt);
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
) -> Result<String, (StatusCode, String)> {
    let conn = pool.get().await.map_err(internal_error)?;

    let row = conn
        .query_one(
            "select password_hash from app_user where username = $1 limit 1",
            &[&form.username],
        )
        .await
        .map_err(internal_error)?;
    // verify
    let password_hash: String = row.try_get(0).map_err(internal_error)?;
    let parsed_hash = PasswordHash::new(&password_hash).unwrap();

    let result = Argon2::default().verify_password(form.password.as_bytes(), &parsed_hash);

    // assert!(Argon2::default().verify_password(form.password.as_bytes(), &parsed_hash).is_ok());

    if result.is_ok() {
        Ok("ok".to_string())
    } else {
        Err((StatusCode::UNAUTHORIZED, "login failed".to_string()))
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Person {
    pub id: u32,
    pub name: String,
}

async fn handler_404() -> impl IntoResponse {
    (StatusCode::NOT_FOUND, "nothing to see here")
}

async fn handle_error(_err: std::io::Error) -> impl IntoResponse {
    (StatusCode::INTERNAL_SERVER_ERROR, "Something went wrong...")
}
