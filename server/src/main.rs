use auth::login::login;
use auth::register::register;
use axum::{
    routing::{get, get_service, post},
    Router,
};
use bb8::Pool;
use bb8_postgres::PostgresConnectionManager;
use db::using_connection_pool_extractor;
use dotenv::dotenv;
use error::{handle_error, handler_404};
use http::Method;
use openssl::ssl::{SslConnector, SslMethod};
use postgres_openssl::MakeTlsConnector;
use tower_http::{
    cors::{Any, CorsLayer},
    services::ServeDir,
};

pub mod article;
pub mod auth;
pub mod db;
pub mod error;

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
        .route("/article", post(article::post_article))
        .layer(cors)
        .with_state(pool);

    let app = app.fallback(handler_404);
    println!("Http Server started on 0.0.0.0:3000");
    hyper::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
