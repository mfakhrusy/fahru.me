use axum::extract;
use bb8::Pool;
use bb8_postgres::PostgresConnectionManager;
use http::StatusCode;
use postgres_openssl::MakeTlsConnector;

use crate::error::{internal_error, ErrorCode};

pub type ConnectionPool = Pool<PostgresConnectionManager<MakeTlsConnector>>;

pub async fn using_connection_pool_extractor(
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
