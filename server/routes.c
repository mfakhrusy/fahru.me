// routes.c
#include <string.h>
#include <unistd.h>
#include <stdio.h>
#include "routes.h"
#include "controllers.h"

void handle_request(int client_fd, const char *request) {
    char method[8], path[128];
    char response[512];

    if (sscanf(request, "%7s %127s", method, path) != 2) {
        const char *bad_request =
            "HTTP/1.1 400 Bad Request\r\n"
            "Content-Type: application/json\r\n"
            "Content-Length: 25\r\n"
            "\r\n"
            "{\"error\": \"Bad Request\"}";
        write(client_fd, bad_request, strlen(bad_request));
        return;
    }

    if (strcmp(method, "GET") == 0 && strcmp(path, "/") == 0) {
        get_hello(response, sizeof(response));
    } else {
        not_found(response, sizeof(response));
    }

    write(client_fd, response, strlen(response));
}
