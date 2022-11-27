use axum::{extract, routing::{get, post, get_service}, response::{Html, Json, IntoResponse}, Router};
use http::StatusCode;
use serde_json::{json, Value};
use tower_http::{services::ServeDir};
use serde::{Deserialize, Serialize};

#[tokio::main]
async fn main() {
    // static assets handler
    let assets_handle = get_service(ServeDir::new("./static/assets")).handle_error(handle_error);

    let app = Router::new().nest_service("/assets", assets_handle)
        .route("/", get(index))
        .route("/index.html", get(index))
        .route("/html", get(html))
        .route("/login", post(login))
        .route("/user/:id", get(user))
        .route("/user/save", post(save_user))
        .route("/search", get(search))
        .route("/json", get(json));

    let app = app.fallback(handler_404);
    println!("Http Server started on 0.0.0.0:3000");
    hyper::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn index() -> Html<&'static str> {
    Html(include_str!("../static/index.html"))
}

// `Html` gives a content-type of `text/html`
async fn html() -> Html<&'static str> {
    Html("<h1>Hello, World!</h1>")
}

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

async fn user(extract::Path((id, )): extract::Path<(u32, )>) -> Json<Person> {
    Json(Person { id, name: "linux_china".to_string() })
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

