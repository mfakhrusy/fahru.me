use axum::{
    response::{IntoResponse, Response},
    Json,
};
use http::StatusCode;
use serde::Serialize;

pub enum RegisterErrorCode {
    PasswordConfirmationNotFound,
    PasswordDoesNotMatch,
    NeedRegistrationCode,
    WrongRegistrationCode,
}

pub enum LoginErrorCode {
    LoginFailed,
    UsernameOrPasswordNotFound,
}

pub enum ErrorCode {
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

pub fn internal_error<E>(_err: E) -> (StatusCode, ErrorCode)
where
    E: std::error::Error,
{
    println!("Error: {}", _err);
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        ErrorCode::SomethingWentWrong,
    )
}

pub async fn handle_error(_err: std::io::Error) -> impl IntoResponse {
    (StatusCode::INTERNAL_SERVER_ERROR, "Something went wrong...")
}

pub async fn handler_404() -> impl IntoResponse {
    (StatusCode::NOT_FOUND, "nothing to see here")
}
