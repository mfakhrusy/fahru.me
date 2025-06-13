// controllers.c
#include <sqlite3.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include "cjson/cJSON.h"
#include "controllers.h"
#include "crypto.h"
#include "session.h"

void not_found(int client_fd) {
    char response[512];
    const char *body = "{\"error\": \"Not Found\"}";
    snprintf(response, sizeof(response),
        "HTTP/1.1 404 Not Found\r\n"
        "Content-Type: application/json\r\n"
        "Content-Length: %lu\r\n"
        "\r\n"
        "%s", strlen(body), body);

    ssize_t bytes_written = write(client_fd, response, strlen(response));
    if (bytes_written < 0) {
        perror("write error");
    }
}

void login(int client_fd, const char* request) {
    char username[64] = {0};
    char password[64] = {0};
    char response[1024];
    char password_hash[65] = {0}; // SHA-256 hash output

    // Find body (skip HTTP headers)
    const char *body = strstr(request, "\r\n\r\n");
    if (!body) {
        const char *error_body = "<html><body>Bad request</body></html>";
        snprintf(response, sizeof(response),
                 "HTTP/1.1 400 Bad Request\r\n"
                 "Content-Type: text/html\r\n"
                 "Content-Length: %lu\r\n"
                 "\r\n"
                 "%s", strlen(error_body), error_body);
        int bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
        return;
    }
    body += 4; // Move past "\r\n\r\n"

    // Parse form data: username=...&password=...
    char *username_start = strstr(body, "username=");
    char *password_start = strstr(body, "password=");
    if (!username_start || !password_start) {
        const char *error_body = "<html><body>Missing credentials</body></html>";
        snprintf(response, sizeof(response),
                 "HTTP/1.1 400 Bad Request\r\n"
                 "Content-Type: text/html\r\n"
                 "Content-Length: %lu\r\n"
                 "\r\n"
                 "%s", strlen(error_body), error_body);
        int bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
        return;
    }

    // Extract username
    username_start += 9; // skip "username="
    char *username_end = strchr(username_start, '&');
    size_t username_len = username_end ? (size_t)(username_end - username_start) : strlen(username_start);
    if (username_len >= sizeof(username)) username_len = sizeof(username) - 1;
    strncpy(username, username_start, username_len);
    username[username_len] = '\0';

    // Extract password
    password_start += 9; // skip "password="
    char *password_end = strchr(password_start, '&');
    size_t password_len = password_end ? (size_t)(password_end - password_start) : strlen(password_start);
    if (password_len >= sizeof(password)) password_len = sizeof(password) - 1;
    strncpy(password, password_start, password_len);
    password[password_len] = '\0';

    // Optionally: URL-decode username and password here

    // hash the password
    hash_sha256(password, password_hash);

    // Query the database
    sqlite3 *db;
    sqlite3_stmt *stmt;
    const char *sql = "SELECT password_hash FROM users WHERE username = ?";
    int found = 0;

    if (sqlite3_open("app.db", &db) == SQLITE_OK) {
        if (sqlite3_prepare_v2(db, sql, -1, &stmt, NULL) == SQLITE_OK) {
            sqlite3_bind_text(stmt, 1, username, -1, SQLITE_STATIC);
            if (sqlite3_step(stmt) == SQLITE_ROW) {
                const char *db_password_hash = (const char *)sqlite3_column_text(stmt, 0);
                if (strcmp(password_hash, db_password_hash) == 0) {
                    found = 1;
                }
            }
            sqlite3_finalize(stmt);
        }
        sqlite3_close(db);
    }

    if (found) {
        char session_token[65];
        if (generate_session_token(session_token, sizeof(session_token)) != 0) {
            const char *error_body = "<html><body>Failed to generate session token</body></html>";
            snprintf(response, sizeof(response),
                     "HTTP/1.1 500 Internal Server Error\r\n"
                     "Content-Type: text/html\r\n"
                     "Content-Length: %lu\r\n"
                     "\r\n"
                     "%s", strlen(error_body), error_body);
            int bytes_written = write(client_fd, response, strlen(response));
            if (bytes_written < 0) {
                perror("write error");
            }
            return;
        }

        // insert into DB
        if (insert_session(db, username, session_token) != SQLITE_OK) {
            const char *error_body = "<html><body>Failed to create session</body></html>";
            snprintf(response, sizeof(response),
                     "HTTP/1.1 500 Internal Server Error\r\n"
                     "Content-Type: text/html\r\n"
                     "Content-Length: %lu\r\n"
                     "\r\n"
                     "%s", strlen(error_body), error_body);
            int bytes_written = write(client_fd, response, strlen(response));
            if (bytes_written < 0) {
                perror("write error");
            }
            return;
        }

        // Redirect to home page with Set-Cookie
        snprintf(response, sizeof(response),
                 "HTTP/1.1 302 Found\r\n"
                 "Location: /\r\n"
                 "Set-Cookie: session_token=%s; HttpOnly\r\n"
                 "Content-Length: 0\r\n"
                 "\r\n", session_token);
        int bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
    } else {
        // Show login page again with error message
        const char *error_html =
            "<!DOCTYPE html><html><body>"
            "<h1>Login Failed</h1>"
            "<p>Invalid credentials. <a href=\"/login\">Try again</a></p>"
            "</body></html>";
        snprintf(response, sizeof(response),
                 "HTTP/1.1 401 Unauthorized\r\n"
                 "Content-Type: text/html\r\n"
                 "Content-Length: %lu\r\n"
                 "\r\n"
                 "%s", strlen(error_html), error_html);
        int bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
    }
}

void get_login(int client_fd, const char *request) {
    char response[2048];
    const char *html_template = 
        "<!DOCTYPE html>"
        "<html lang=\"en\">"
        "<head>"
        "<meta charset=\"UTF-8\">"
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
        "<title>Login</title>"
        "<style>"
        "body {"
        "  background: #f5f5f5;"
        "  display: flex;"
        "  justify-content: center;"
        "  align-items: center;"
        "  height: 100vh;"
        "  margin: 0;"
        "}"
        ".login-container {"
        "  background: #fff;"
        "  padding: 32px 24px;"
        "  border-radius: 8px;"
        "  box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
        "  min-width: 300px;"
        "  text-align: center;"
        "}"
        ".login-container input {"
        "  width: 90%;"
        "  padding: 8px;"
        "  margin: 8px 0;"
        "  border: 1px solid #ccc;"
        "  border-radius: 4px;"
        "}"
        ".login-container button {"
        "  padding: 10px 24px;"
        "  background: #007bff;"
        "  color: #fff;"
        "  border: none;"
        "  border-radius: 4px;"
        "  cursor: pointer;"
        "  margin-top: 12px;"
        "}"
        ".login-container button:hover {"
        "  background: #0056b3;"
        "}"
        "</style>"
        "</head>"
        "<body>"
        "<div class=\"login-container\">"
        "<h1>Login</h1>"
        "<form method=\"POST\" action=\"/login\">"
        "Username:<br><input type=\"text\" name=\"username\" required><br>"
        "Password:<br><input type=\"password\" name=\"password\" required><br>"
        "<button type=\"submit\">Login</button>"
        "</form>"
        "</div>"
        "</body>"
        "</html>";

    size_t html_len = strlen(html_template);

    // Send HTTP headers first
    int header_len = snprintf(response, sizeof(response),
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: text/html\r\n"
        "Content-Length: %zu\r\n"
        "\r\n", html_len);

    ssize_t bytes_written = write(client_fd, response, header_len);
    if (bytes_written < 0) {
        perror("write error");
        return;
    }

    // Send the body in chunks
    size_t sent = 0;
    while (sent < html_len) {
        size_t chunk = (html_len - sent > sizeof(response)) ? sizeof(response) : (html_len - sent);
        memcpy(response, html_template + sent, chunk);
        bytes_written = write(client_fd, response, chunk);
        if (bytes_written < 0) {
            perror("write error");
            break;
        }
        sent += chunk;
    }
}
