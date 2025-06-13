#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
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
    const char *sql = "INSERT INTO sessions (session_token, username, expires_at) VALUES (?, ?, ?)";
    sqlite3_stmt *stmt;
    int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);
    if (rc != SQLITE_OK) return rc;

    time_t now = time(NULL);
    time_t expires = now + 3600 * 24; // expire in 24h

    sqlite3_bind_text(stmt, 1, session_token, -1, SQLITE_STATIC);
    sqlite3_bind_text(stmt, 2, username, -1, SQLITE_STATIC);
    sqlite3_bind_int64(stmt, 3, expires);

    rc = sqlite3_step(stmt);
    sqlite3_finalize(stmt);

    if (rc != SQLITE_DONE) return rc;
    return SQLITE_OK;
}
