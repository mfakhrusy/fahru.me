// controllers.c
#include <stdio.h>
#include <string.h>
#include "controllers.h"

void get_hello(int client_fd) {
    char response[512];
    const char *body = "{\"message\": \"Hello, World!\"}";
    snprintf(response, sizeof(response),
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: application/json\r\n"
        "Content-Length: %lu\r\n"
        "\r\n"
        "%s", strlen(body), body);

    write(client_fd, response, strlen(response));
}

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
