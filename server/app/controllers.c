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

void post_login(int client_fd, const char* request) {
    char username[64] = {0};
    char password[64] = {0};
    char response[1024];
    char password_hash[65] = {0}; // SHA-256 hash output

    // Find body (skip HTTP headers)
    const char *body = strstr(request, "\r\n\r\n");
    int body_offset = 4;
    if (!body) {
        body = strstr(request, "\n\n");
        body_offset = 2;
    }
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
    body += body_offset; // Move past header/body separator

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

void get_login(int client_fd, const char* request) {
    // check if user has a valid session
    char *session_token = NULL;
    const char *cookie_header = strstr(request, "Cookie: ");
    if (cookie_header) {
        cookie_header += 8; // Move past "Cookie: "
        const char *token_start = strstr(cookie_header, "session_token=");
        if (token_start) {
            token_start += 14; // Move past "session_token="
            const char *token_end = strchr(token_start, ';');
            if (!token_end) {
                token_end = cookie_header + strlen(cookie_header);
            }
            size_t token_len = token_end - token_start;
            session_token = strndup(token_start, token_len);
        }
    }
    int session_valid = SQLITE_ERROR;
    if (session_token) {
        session_valid = check_user_session(session_token); // Pass NULL for db
        free(session_token); // Free the session token after use
    }
    if (session_valid == SQLITE_OK) {
        // User already logged in, redirect to home
        char response[512];
        snprintf(response, sizeof(response),
                 "HTTP/1.1 302 Found\r\n"
                 "Location: /\r\n"
                 "Content-Length: 0\r\n"
                 "\r\n");
        ssize_t bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
        return;
    }

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

void get_home(int client_fd, const char* request) {
    // Check for session token in the request
    char *session_token = NULL;
    const char *cookie_header = strstr(request, "Cookie: ");
    if (cookie_header) {
        cookie_header += 8; // Move past "Cookie: "
        const char *token_start = strstr(cookie_header, "session_token=");
        if (token_start) {
            token_start += 14; // Move past "session_token="
            const char *token_end = strchr(token_start, ';');
            if (!token_end) {
                token_end = cookie_header + strlen(cookie_header);
            }
            size_t token_len = token_end - token_start;
            session_token = strndup(token_start, token_len);
        }
    }

    if (!session_token) {
        // No session token found, redirect to login
        char response[512];
        snprintf(response, sizeof(response),
                 "HTTP/1.1 302 Found\r\n"
                 "Location: /login\r\n"
                 "Content-Length: 0\r\n"
                 "\r\n");
        ssize_t bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
        return;
    }
    int session_valid = check_user_session(session_token); // Pass NULL for db
    if (session_valid != SQLITE_OK) {
        // Session is invalid
        char response[512];
        snprintf(response, sizeof(response),
                 "HTTP/1.1 302 Found\r\n"
                 "Location: /login\r\n"
                 "Content-Length: 0\r\n"
                 "\r\n");
        ssize_t bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
        free((void *)session_token);
        return;
    }

    // session token is valid, proceed to serve the home page
    // free the session token after use
    free((void *)session_token);

    char response[2048];
    const char *html_template = 
        "<!DOCTYPE html>"
        "<html lang=\"en\">"
        "<head>"
        "<meta charset=\"UTF-8\">"
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
        "<title>Home</title>"
        "<style>"
        "body {"
        "  font-family: Arial, sans-serif;"
        "  margin: 0;"
        "  padding: 0;"
        "}"
        "nav {"
        "  background: #007bff;"
        "  padding: 12px 24px;"
        "}"
        "nav a {"
        "  color: #fff;"
        "  text-decoration: none;"
        "  font-weight: bold;"
        "  margin-right: 16px;"
        "}"
        "nav a:hover {"
        "  text-decoration: underline;"
        "}"
        "</style>"
        "</head>"
        "<body>"
        "<nav>"
        "<a href=\"/\">Home</a>"
        "<a href=\"/guestbook\">Guest book</a>"
        "</nav>"
        "<h1>Welcome to the Home Page!</h1>"
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

void get_guestbook_page(int client_fd, const char* request) {
    // Check for session token in the request
    char *session_token = NULL;
    const char *cookie_header = strstr(request, "Cookie: ");
    if (cookie_header) {
        cookie_header += 8; // Move past "Cookie: "
        const char *token_start = strstr(cookie_header, "session_token=");
        if (token_start) {
            token_start += 14; // Move past "session_token="
            const char *token_end = strchr(token_start, ';');
            if (!token_end) {
                token_end = cookie_header + strlen(cookie_header);
            }
            size_t token_len = token_end - token_start;
            session_token = strndup(token_start, token_len);
        }
    }

    if (!session_token) {
        // No session token found, redirect to login
        char response[512];
        snprintf(response, sizeof(response),
                 "HTTP/1.1 302 Found\r\n"
                 "Location: /login\r\n"
                 "Content-Length: 0\r\n"
                 "\r\n");
        ssize_t bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
        return;
    }
    int session_valid = check_user_session(session_token); // Pass NULL for db
    if (session_valid != SQLITE_OK) {
        // Session is invalid
        char response[512];
        snprintf(response, sizeof(response),
                 "HTTP/1.1 302 Found\r\n"
                 "Location: /login\r\n"
                 "Content-Length: 0\r\n"
                 "\r\n");
        ssize_t bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
        free((void *)session_token);
        return;
    }

    // session token is valid, proceed to serve the guestbook page
    free((void *)session_token);

    // get guestbook list from db
    sqlite3 *db;
    sqlite3_stmt *stmt;
    const char *sql = "SELECT id, name, website, message, verified, deleted, created_at FROM guestbook ORDER BY created_at DESC";
    if (sqlite3_open("app.db", &db) != SQLITE_OK) {
        perror("sqlite3_open failed");
        return;
    }
    if (sqlite3_prepare_v2(db, sql, -1, &stmt, NULL) != SQLITE_OK) {
        fprintf(stderr, "sqlite3_prepare_v2 failed: %s\n", sqlite3_errmsg(db));
        sqlite3_close(db);
        return;
    }
    cJSON *json = cJSON_CreateArray();

    while (sqlite3_step(stmt) == SQLITE_ROW) {
        cJSON *entry = cJSON_CreateObject();
        int id = sqlite3_column_int(stmt, 0);
        const char *name = (const char *)sqlite3_column_text(stmt, 1);
        const char *website = (const char *)sqlite3_column_text(stmt, 3);
        const char *message = (const char *)sqlite3_column_text(stmt, 4);

        int verified = sqlite3_column_int(stmt, 5);
        int deleted = sqlite3_column_int(stmt, 6);

        const char *created_at = (const char *)sqlite3_column_text(stmt, 7);

        cJSON_AddNumberToObject(entry, "id", id);
        cJSON_AddStringToObject(entry, "name", name ? name : "");
        cJSON_AddStringToObject(entry, "website", website ? website : "");
        cJSON_AddStringToObject(entry, "message", message ? message : "");
        cJSON_AddBoolToObject(entry, "verified", verified);
        cJSON_AddBoolToObject(entry, "deleted", deleted);
        cJSON_AddStringToObject(entry, "created_at", created_at ? created_at : "");

        cJSON_AddItemToArray(json, entry);
    }
    sqlite3_finalize(stmt);
    sqlite3_close(db);
    // Convert JSON to string
    char *json_string = cJSON_PrintUnformatted(json);
    cJSON_Delete(json);
    if (!json_string) {
        perror("cJSON_PrintUnformatted failed");
        return;
    }

    // Prepare the HTML with the JSON string injected
    // Use a large enough buffer for the HTML
    size_t html_buf_size = 32768;
    char *html_buf = malloc(html_buf_size);
    if (!html_buf) {
        free(json_string);
        perror("malloc failed");
        return;
    }

    const char *html_template =
        "<!DOCTYPE html>"
        "<html lang=\"en\">"
        "<head>"
        "<meta charset=\"UTF-8\">"
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
        "<title>Guestbook</title>"
        "<style>"
        "body {"
        "  font-family: Arial, sans-serif;"
        "  margin: 0;"
        "  padding: 0;"
        "}"
        "nav {"
        "  background: #007bff;"
        "  padding: 12px 24px;"
        "}"
        "nav a {"
        "  color: #fff;"
        "  text-decoration: none;"
        "  font-weight: bold;"
        "  margin-right: 16px;"
        "}"
        "nav a:hover {"
        "  text-decoration: underline;"
        "}"
        "</style>"
        "</head>"
        "<body>"
        "<nav>"
        "<a href=\"/\">Home</a>"
        "<a href=\"/guestbook\">Guest book</a>"
        "</nav>"
        "<h1>Guestbook page!</h1>"
        "<h2>Entries:</h2>"
        "<ul id=\"guestbook-list\">"
        "</ul>"
        "<script>"
        "const entries = JSON.parse(`%s`);"
        "const list = document.getElementById('guestbook-list');"
        "entries.forEach(entry => {"
        "  const item = document.createElement('li');"
        "  item.innerHTML = `<strong>${entry.name}</strong> (${entry.email})<br>"
        "                   <a href=\"${entry.website}\" target=\"_blank\">${entry.website}</a><br>"
        "                   <p>${entry.message}</p>"
        "                   <small>Created at: ${entry.created_at}</small>`;"
        "  if (entry.verified) {"
        "    item.innerHTML += ' <span style=\"color: green;\">(Verified)</span>';"
        "  } else {"
        "    item.innerHTML += ' <span style=\"color: red;\">(Not Verified)</span>';"
        "  }"
        "  if (entry.deleted) {"
        "    item.innerHTML += ' <span style=\"color: gray;\">(Deleted)</span>';"
        "  }"
        "  list.appendChild(item);"
        "});"
        "</script>"
        "</body>"
        "</html>";

    // Compose the HTML with the JSON string injected
    int html_len = snprintf(html_buf, html_buf_size, html_template, json_string);

    free(json_string);

    if (html_len < 0 || (size_t)html_len >= html_buf_size) {
        free(html_buf);
        perror("snprintf for html_buf failed or truncated");
        return;
    }

    // Send HTTP headers first
    char header[256];
    int header_len = snprintf(header, sizeof(header),
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: text/html\r\n"
        "Content-Length: %d\r\n"
        "\r\n", html_len);

    ssize_t bytes_written = write(client_fd, header, header_len);
    if (bytes_written < 0) {
        perror("write error");
        free(html_buf);
        return;
    }

    // Send the HTML body in chunks
    size_t sent = 0;
    while (sent < (size_t)html_len) {
        size_t chunk = ((size_t)html_len - sent > 2048) ? 2048 : ((size_t)html_len - sent);
        bytes_written = write(client_fd, html_buf + sent, chunk);
        if (bytes_written < 0) {
            perror("write error");
            break;
        }
        sent += chunk;
    }

    free(html_buf);
}

void get_guestbook_list(int client_fd) {
    sqlite3 *db;
    sqlite3_stmt *stmt;
    const char *sql = "SELECT id, name, website, message, verified, deleted, created_at FROM guestbook ORDER BY created_at DESC";
    
    if (sqlite3_open("app.db", &db) != SQLITE_OK) {
        perror("sqlite3_open failed");
        return;
    }

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, NULL) != SQLITE_OK) {
        fprintf(stderr, "sqlite3_prepare_v2 failed: %s\n", sqlite3_errmsg(db));
        sqlite3_close(db);
        return;
    }

    cJSON *json = cJSON_CreateArray();
    while (sqlite3_step(stmt) == SQLITE_ROW) {
        cJSON *entry = cJSON_CreateObject();
        int id = sqlite3_column_int(stmt, 0);
        const char *name = (const char *)sqlite3_column_text(stmt, 1);
        const char *website = (const char *)sqlite3_column_text(stmt, 2);
        const char *message = (const char *)sqlite3_column_text(stmt, 3);
        int verified = sqlite3_column_int(stmt, 4);
        int deleted = sqlite3_column_int(stmt, 5);
        const char *created_at = (const char *)sqlite3_column_text(stmt, 6);

        cJSON_AddNumberToObject(entry, "id", id);
        cJSON_AddStringToObject(entry, "name", name);
        cJSON_AddStringToObject(entry, "website", website);
        cJSON_AddStringToObject(entry, "message", message);
        cJSON_AddBoolToObject(entry, "verified", verified);
        cJSON_AddBoolToObject(entry, "deleted", deleted);
        cJSON_AddStringToObject(entry, "created_at", created_at ? created_at : "");
        cJSON_AddItemToArray(json, entry);
    }
    sqlite3_finalize(stmt);
    sqlite3_close(db);
    char *json_string = cJSON_PrintUnformatted(json);
    cJSON_Delete(json);
    if (!json_string) {
        perror("cJSON_PrintUnformatted failed");
        return;
    }
    char header[256];
    int header_len = snprintf(header, sizeof(header),
             "HTTP/1.1 200 OK\r\n"
             "Content-Type: application/json\r\n"
             "Content-Length: %zu\r\n"
             "Access-Control-Allow-Origin: *\r\n" // TODO: Adjust CORS policy as needed
             "\r\n", strlen(json_string));
    ssize_t bytes_written = write(client_fd, header, header_len);
    if (bytes_written < 0) {
        perror("write error");
        free(json_string);
        return;
    }

    size_t sent = 0;
    size_t json_len = strlen(json_string);
    while (sent < json_len) {
        size_t chunk = (json_len - sent > 2048) ? 2048 : (json_len - sent);
        bytes_written = write(client_fd, json_string + sent, chunk);
        if (bytes_written < 0) {
            perror("write error");
            break;
        }
        sent += chunk;
    }
    free(json_string);
}

void post_guestbook_entry(int client_fd, const char* request) {
    // Find body (skip HTTP headers)
    const char *body = strstr(request, "\r\n\r\n");
    if (!body) {
        const char *error_body = "{\"error\": \"Bad request\"}";
        char response[512];
        snprintf(response, sizeof(response),
                 "HTTP/1.1 400 Bad Request\r\n"
                 "Content-Type: application/json\r\n"
                 "Content-Length: %lu\r\n"
                 "Access-Control-Allow-Origin: *\r\n" // TODO: Adjust CORS policy as needed
                 "\r\n"
                 "%s", strlen(error_body), error_body);
        int bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
        return;
    }

    body += 4; // Move past "\r\n\r\n"

    // Parse JSON body: {"name": "...", "website": "...", "message": "..."}
    char name[128] = {0}, website[256] = {0}, message[1024] = {0};

    cJSON *json = cJSON_Parse(body);
    if (!json) {
        const char *error_body = "{\"error\": \"Invalid JSON\"}";
        char response[512];
        snprintf(response, sizeof(response),
                 "HTTP/1.1 400 Bad Request\r\n"
                 "Content-Type: application/json\r\n"
                 "Content-Length: %lu\r\n"
                 "Access-Control-Allow-Origin: *\r\n"
                 "\r\n"
                 "%s", strlen(error_body), error_body);
        int bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
        return;
    }

    const cJSON *jname = cJSON_GetObjectItemCaseSensitive(json, "name");
    const cJSON *jwebsite = cJSON_GetObjectItemCaseSensitive(json, "website");
    const cJSON *jmessage = cJSON_GetObjectItemCaseSensitive(json, "message");

    if (cJSON_IsString(jname) && (jname->valuestring != NULL)) {
        strncpy(name, jname->valuestring, sizeof(name) - 1);
    }
    if (cJSON_IsString(jwebsite) && (jwebsite->valuestring != NULL)) {
        strncpy(website, jwebsite->valuestring, sizeof(website) - 1);
    }
    if (cJSON_IsString(jmessage) && (jmessage->valuestring != NULL)) {
        strncpy(message, jmessage->valuestring, sizeof(message) - 1);
    }

    cJSON_Delete(json);

    // Optionally: URL-decode fields here

    if (name[0] == '\0' || message[0] == '\0') {
        const char *error_body = "{\"error\": \"Missing fields\"}";
        char response[512];
        snprintf(response, sizeof(response),
                 "HTTP/1.1 400 Bad Request\r\n"
                 "Content-Type: application/json\r\n"
                 "Content-Length: %lu\r\n"
                 "Access-Control-Allow-Origin: *\r\n"
                 "\r\n"
                 "%s", strlen(error_body), error_body);
        int bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
        return;
    }

    // Insert into the database
    sqlite3 *db;
    sqlite3_stmt *stmt;
    const char *sql = "INSERT INTO guestbook (name, website, message, verified, deleted, created_at) VALUES (?, ?, ?, 0, 0, strftime('%Y-%m-%d %H:%M:%S', 'now'))";
    if (sqlite3_open("app.db", &db) != SQLITE_OK) {
        perror("sqlite3_open failed");
        return;
    }

    if (sqlite3_prepare_v2(db, sql, -1, &stmt, NULL) != SQLITE_OK) {
        fprintf(stderr, "sqlite3_prepare_v2 failed: %s\n", sqlite3_errmsg(db));
        sqlite3_close(db);
        return;
    }

    sqlite3_bind_text(stmt, 1, name, -1, SQLITE_STATIC);
    sqlite3_bind_text(stmt, 2, website, -1, SQLITE_STATIC);
    sqlite3_bind_text(stmt, 3, message, -1, SQLITE_STATIC);

    int rc = sqlite3_step(stmt);

    if (rc != SQLITE_DONE) {
        fprintf(stderr, "sqlite3_step failed: %s\n", sqlite3_errmsg(db));
        const char *error_body = "{\"error\": \"Failed to insert entry\"}";
        char response[512];
        snprintf(response, sizeof(response),
             "HTTP/1.1 400 Bad Request\r\n"
             "Content-Type: application/json\r\n"
             "Content-Length: %lu\r\n"
             "Access-Control-Allow-Origin: *\r\n"
             "\r\n"
             "%s", strlen(error_body), error_body);
        int bytes_written = write(client_fd, response, strlen(response));
        if (bytes_written < 0) {
            perror("write error");
        }
        sqlite3_finalize(stmt);
        sqlite3_close(db);
        return;
    }

    sqlite3_finalize(stmt);
    sqlite3_close(db);
    // Return JSON response after successful submission
    const char *success_body = "{\"success\": true}";
    char response[256];
    snprintf(response, sizeof(response),
             "HTTP/1.1 200 OK\r\n"
             "Content-Type: application/json\r\n"
             "Access-Control-Allow-Origin: *\r\n"
             "Content-Length: %lu\r\n"
             "\r\n"
             "%s", strlen(success_body), success_body);
    ssize_t bytes_written = write(client_fd, response, strlen(response));
    if (bytes_written < 0) {
        perror("write error");
    }
}
