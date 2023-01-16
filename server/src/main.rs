use axum::{
    extract,
    response::{Html, IntoResponse, Json},
    routing::{get, get_service, post},
    Router,
};
use bb8::{Pool, PooledConnection};
use bb8_postgres::PostgresConnectionManager;
use dotenv::dotenv;
use http::StatusCode;
use openssl::ssl::{SslConnector, SslMethod};
use postgres::Client;
use postgres_openssl::MakeTlsConnector;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::{env, error};
use tokio_postgres::{tls::TlsConnect, NoTls};
use tower_http::services::ServeDir;

#[tokio::main]
async fn main() {
    dotenv().ok();
    let connection_string = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    // let pg_password = std::env::var("PGPASSWORD").expect("PGPASSWORD must be set");
    // let pg_host = std::env::var("PGHOST").expect("PGHOST must be set");
    // let pg_dbname = std::env::var("PGDATABASE").expect("PGDATABASE must be set");

    let builder = SslConnector::builder(SslMethod::tls()).unwrap();
    let connector = MakeTlsConnector::new(builder.build());

    // let connection_string = format!(
    //     "postgresql://{}:{}@{}:5432/{}",
    //     pg_user, pg_password, pg_host, pg_dbname
    // );
    let manager =
        PostgresConnectionManager::new_from_stringlike(connection_string, connector).unwrap();

    let pool = Pool::builder().build(manager).await.unwrap();

    // static assets handler
    let assets_handle = get_service(ServeDir::new("./static/assets")).handle_error(handle_error);

    let app = Router::new()
        .nest_service("/assets", assets_handle)
        // .route("/", get(index))
        // .route("/index.html", get(index))
        // .route("/html", get(html))
        .route(
            "/",
            get(using_connection_pool_extractor).post(using_connection_pool_extractor),
        )
        // .route("/", get(json))
        .with_state(pool);
    // .route("/login", post(login))
    // .route("/user/:id", get(user))
    // .route("/user/save", post(save_user))
    // .route("/search", get(search))
    // .route("/json", get(json));

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
    // println!("test");

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
    (StatusCode::INTERNAL_SERVER_ERROR, err.to_string())
}

// async fn index() -> Html<&'static str> {
//     Html(include_str!("../static/index.html"))
// }

// `Html` gives a content-type of `text/html`
// async fn html() -> Html<&'static str> {
//     Html("<h1>Hello, World!</h1>")
// }

async fn save_user(extract::Json(user): extract::Json<Person>) -> Json<Value> {
    println!("name: {}", user.name);
    Json(json!(true))
}

#[derive(Deserialize)]
struct LoginForm {
    username: String,
    password: String,
}

async fn login(extract::Form(form): extract::Form<LoginForm>) -> Html<String> {
    println!("username: {}, password: {}", form.username, form.password);
    Html(format!("<h1>Hello, {}!</h1>", &form.username))
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Person {
    pub id: u32,
    pub name: String,
}

async fn json() -> Json<Value> {
    Json(json!({ "data": 42 }))
}

async fn user(extract::Path((id,)): extract::Path<(u32,)>) -> Json<Person> {
    Json(Person {
        id,
        name: "linux_china".to_string(),
    })
}

#[derive(Deserialize)]
struct SearchQuery {
    page: Option<u32>,
    q: Option<String>,
}

async fn search(extract::Query(query): extract::Query<SearchQuery>) -> Html<String> {
    let q = query.q.unwrap_or("".to_string());
    print!("q: {}, page: {}", q, query.page.unwrap_or(0));
    Html(format!("<h1>Hello, {}!</h1>", q))
}

async fn handler_404() -> impl IntoResponse {
    (StatusCode::NOT_FOUND, "nothing to see here")
}

async fn handle_error(_err: std::io::Error) -> impl IntoResponse {
    (StatusCode::INTERNAL_SERVER_ERROR, "Something went wrong...")
}
