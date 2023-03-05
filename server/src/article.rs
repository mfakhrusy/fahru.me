use crate::{db::ConnectionPool, error::ErrorCode};
use axum::extract;
use http::StatusCode;

type AddArticleJson = serde_json::Value;

pub async fn post_article(
    extract::State(pool): extract::State<ConnectionPool>,
    extract::Json(json): extract::Json<AddArticleJson>,
) -> Result<String, (StatusCode, ErrorCode)> {
    let conn = pool.get().await.map_err(|err| {
        println!("err: {:?}", err);
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            ErrorCode::SomethingWentWrong(Some("error 0".to_string())),
        )
    })?;

    let title: String = json["title"].as_str().unwrap().to_string();
    let content: String = json["content"].as_str().unwrap().to_string();

    // TODO: get user_id from jwt
    let user_id: i32 = conn
        .query_one("select id from app_user limit 1", &[])
        .await
        .map_err(|err| {
            println!("err: {:?}", err);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                ErrorCode::SomethingWentWrong(Some("error 1".to_string())),
            )
        })?
        .try_get(0)
        .unwrap();

    println!("user_id: {:?}", user_id);

    let row = conn
        .query_one(
            "insert into article (user_id, title, content) values ($1, $2, $3) returning id",
            &[&user_id, &title, &content],
        )
        .await
        .map_err(|err| {
            println!("err: {:?}", err);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                ErrorCode::SomethingWentWrong(Some("error 2".to_string())),
            )
        })?;

    let id: i32 = row.try_get(0).unwrap();

    Ok(id.to_string())
}
