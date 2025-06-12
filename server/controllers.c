// controllers.c
#include <stdio.h>
#include <string.h>
#include "controllers.h"

void get_hello(char *buffer, size_t size) {
    const char *body = "{\"message\": \"Hello, World!\"}";
    snprintf(buffer, size,
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: application/json\r\n"
        "Content-Length: %lu\r\n"
        "\r\n"
        "%s", strlen(body), body);
}

void not_found(char *buffer, size_t size) {
    const char *body = "{\"error\": \"Not Found\"}";
    snprintf(buffer, size,
        "HTTP/1.1 404 Not Found\r\n"
        "Content-Type: application/json\r\n"
        "Content-Length: %lu\r\n"
        "\r\n"
        "%s", strlen(body), body);
}
