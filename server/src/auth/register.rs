use crate::db::ConnectionPool;
use crate::error::{internal_error, ErrorCode, RegisterErrorCode};
use argon2::{password_hash::SaltString, Argon2, PasswordHasher};
use axum::extract;
use http::StatusCode;
use rand_core::OsRng;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct RegisterForm {
    username: String,
    password: String,
    confirm_password: Option<String>,
    registration_code: Option<String>,
}

pub async fn register(
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
