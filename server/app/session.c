#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <string.h>
#include <unistd.h>
#include <time.h>
#include <sqlite3.h>

int generate_session_token(char *out, size_t out_len) {
    if (out_len < 65) return -1; // 64 chars + null

    unsigned char buf[32];
    int fd = open("/dev/urandom", O_RDONLY);
    if (fd < 0) return -1;

    ssize_t n = read(fd, buf, sizeof(buf));
    close(fd);
    if (n != sizeof(buf)) return -1;

    for (int i = 0; i < 32; i++) {
        sprintf(out + i*2, "%02x", buf[i]);
    }
    out[64] = '\0';
    return 0;
}

int insert_session(sqlite3 *db, const char *username, const char *session_token) {
    int sqliteopen = sqlite3_open("app.db", &db);
    if (sqliteopen != SQLITE_OK) {
        fprintf(stderr, "sqlite3_open failed 6: %s\n", sqlite3_errmsg(db));
        return sqliteopen;
    }

    const char *sql = "INSERT INTO sessions (session_token, username, expires_at) VALUES (?, ?, ?)";
    sqlite3_stmt *stmt;
    int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);
    if (rc != SQLITE_OK) {
        fprintf(stderr, "sqlite3_prepare_v2 failed: %s\n", sqlite3_errmsg(db));
        fprintf(stderr, "session_token: %s, username: %s\n", session_token, username);
        fprintf(stderr, "rc: %d\n", rc);
        return rc;
    }

    time_t now = time(NULL);
    time_t expires = now + 3600 * 24; // expire in 24h

    sqlite3_bind_text(stmt, 1, session_token, -1, SQLITE_STATIC);
    sqlite3_bind_text(stmt, 2, username, -1, SQLITE_STATIC);
    sqlite3_bind_int64(stmt, 3, expires);

    rc = sqlite3_step(stmt);
    sqlite3_finalize(stmt);
    sqlite3_close_v2(db);

    if (rc != SQLITE_DONE) {
        fprintf(stderr, "sqlite3_step failed: %s\n", sqlite3_errmsg(db));
        return rc;
    }
    return SQLITE_OK;
}

int check_user_session(char *session_token) {
    // remove the last 4 characters if it's "\r\n\r\n"
    size_t len = strlen(session_token);
    if (len >= 4 && strcmp(session_token + len - 4, "\r\n\r\n") == 0) {
        session_token[len - 4] = '\0';
    }

    sqlite3 *db;
    sqlite3_stmt *stmt;
    const char *sql = "SELECT expires_at FROM sessions WHERE session_token = ?";

    sqlite3_open("app.db", &db);
    if (!db) {
        fprintf(stderr, "sqlite3_open failed 7: %s\n", sqlite3_errmsg(db));
        return SQLITE_ERROR;
    }

    if (!session_token) {
        fprintf(stderr, "Session token is NULL\n");
        sqlite3_close_v2(db);
        return SQLITE_ERROR;
    }

    int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);
    if (rc != SQLITE_OK) {
        fprintf(stderr, "sqlite3_prepare_v2 failed: %s\n", sqlite3_errmsg(db));
        return rc;
    }

    sqlite3_bind_text(stmt, 1, session_token, -1, SQLITE_STATIC);

    rc = sqlite3_step(stmt);

    if (rc == SQLITE_ROW) {
        time_t expires = sqlite3_column_int64(stmt, 0);
        time_t now = time(NULL);
        sqlite3_finalize(stmt);
        sqlite3_close_v2(db);
        if (expires > now) {
            return SQLITE_OK; // User has a valid session
        } else {
            return SQLITE_ERROR; // Session expired
        }
    } else if (rc == SQLITE_DONE) {
        sqlite3_finalize(stmt);
        sqlite3_close_v2(db);
        return SQLITE_ERROR; // No session found
    } else {
        fprintf(stderr, "sqlite3_step failed: %s\n", sqlite3_errmsg(db));
        sqlite3_finalize(stmt);
        sqlite3_close_v2(db);
        return rc;
    }
}
