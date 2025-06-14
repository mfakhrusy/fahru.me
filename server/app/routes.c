// routes.c
#include <string.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include "routes.h"
#include "controllers.h"

void handle_request(int client_fd, const char *request) {
    char method[8], path[128];

    if (sscanf(request, "%7s %127s", method, path) != 2) {
        const char *bad_request =
            "HTTP/1.1 400 Bad Request\r\n"
            "Content-Type: application/json\r\n"
            "Content-Length: 25\r\n"
            "\r\n"
            "{\"error\": \"Bad Request\"}";
        ssize_t bytes_written = write(client_fd, bad_request, strlen(bad_request));
        if (bytes_written < 0) {
            perror("write error");
        }
        close(client_fd);
        free((void *)request);
        return;
    }

    if (strcmp(method, "GET") == 0 && strcmp(path, "/") == 0) {
        get_home(client_fd, request);
    } else if (strcmp(method, "POST") == 0 && strcmp(path, "/login") == 0) {
        post_login(client_fd, request);
    } else if (strcmp(method, "GET") == 0 && strcmp(path, "/login") == 0) {
        get_login(client_fd, request);
    } else {
        not_found(client_fd);
    }
}
