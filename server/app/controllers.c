// controllers.c
#include <sqlite3.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "cjson/cJSON.h"
#include "controllers.h"
#include "crypto.h"

void not_found(int client_fd) {
    char response[512];
    const char *body = "{\"error\": \"Not Found\"}";
    snprintf(response, sizeof(response),
        "HTTP/1.1 404 Not Found\r\n"
        "Content-Type: application/json\r\n"
        "Content-Length: %lu\r\n"
        "\r\n"
        "%s", strlen(body), body);

    write(client_fd, response, strlen(response));
}

void login(int client_fd, const char* request) {
    char username[64] = {0};
    char password[64] = {0};
    char response[512];
    char password_hash[65] = {0}; // SHA-256 hash output

    // Find JSON body (skip HTTP headers)
    const char *json_start = strstr(request, "\r\n\r\n");
    if (!json_start) {
        const char *error_body = "{\"error\": \"Bad request\"}";
        snprintf(response, sizeof(response),
                 "HTTP/1.1 400 Bad Request\r\n"
                 "Content-Type: application/json\r\n"
                 "Content-Length: %lu\r\n"
                 "\r\n"
                 "%s", strlen(error_body), error_body);
        write(client_fd, response, strlen(response));
        return;
    }

    json_start += 4; // Move past "\r\n\r\n"

    // Parse JSON body
    cJSON *json = cJSON_Parse(json_start);
    if (!json) {
        const char *error_body = "{\"error\": \"Invalid JSON\"}";
        snprintf(response, sizeof(response),
                 "HTTP/1.1 400 Bad Request\r\n"
                 "Content-Type: application/json\r\n"
                 "Content-Length: %lu\r\n"
                 "\r\n"
                 "%s", strlen(error_body), error_body);
        write(client_fd, response, strlen(response));
        return;
    }

    cJSON *user_item = cJSON_GetObjectItemCaseSensitive(json, "username");
    cJSON *pass_item = cJSON_GetObjectItemCaseSensitive(json, "password");

    if (cJSON_IsString(user_item) && cJSON_IsString(pass_item)) {
        strncpy(username, user_item->valuestring, sizeof(username) - 1);
        strncpy(password, pass_item->valuestring, sizeof(password) - 1);
    } else {
        const char *error_body = "{\"error\": \"Missing credentials\"}";
        snprintf(response, sizeof(response),
                 "HTTP/1.1 400 Bad Request\r\n"
                 "Content-Type: application/json\r\n"
                 "Content-Length: %lu\r\n"
                 "\r\n"
                 "%s", strlen(error_body), error_body);
        write(client_fd, response, strlen(response));
        cJSON_Delete(json);
        return;
    }

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


    // Build JSON response using cJSON
    cJSON *res_json = cJSON_CreateObject();

    if (found) {
        cJSON_AddStringToObject(res_json, "message", "Login successful");
        char *res_str = cJSON_PrintUnformatted(res_json);
        snprintf(response, sizeof(response),
                 "HTTP/1.1 200 OK\r\n"
                 "Content-Type: application/json\r\n"
                 "Content-Length: %lu\r\n"
                 "\r\n"
                 "%s", strlen(res_str), res_str);
        write(client_fd, response, strlen(response));
        free(res_str);
    } else {
        cJSON_AddStringToObject(res_json, "error", "Invalid credentials");
        char *res_str = cJSON_PrintUnformatted(res_json);
        snprintf(response, sizeof(response),
                 "HTTP/1.1 401 Unauthorized\r\n"
                 "Content-Type: application/json\r\n"
                 "Content-Length: %lu\r\n"
                 "\r\n"
                 "%s", strlen(res_str), res_str);
        write(client_fd, response, strlen(response));
        free(res_str);
    }

    cJSON_Delete(res_json);
    cJSON_Delete(json);
}
