use argon2::{Argon2, PasswordHash, PasswordVerifier};
use axum::extract;
use http::StatusCode;
use serde::Deserialize;

use crate::{
    db::ConnectionPool,
    error::{internal_error, ErrorCode, LoginErrorCode},
};

#[derive(Deserialize)]
pub struct LoginForm {
    username: String,
    password: String,
}

pub async fn login(
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
