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

    if (strcmp(method, "OPTIONS") == 0) {
        const char *options_response =
            "HTTP/1.1 204 No Content\r\n"
            "Allow: GET, POST, OPTIONS\r\n"
            "Access-Control-Allow-Origin: *\r\n" // TODO: Adjust for security
            "Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n"
            "Access-Control-Allow-Headers: Content-Type\r\n"
            "Access-Control-Max-Age: 86400\r\n"
            "Content-Length: 0\r\n"
            "\r\n";
        ssize_t bytes_written = write(client_fd, options_response, strlen(options_response));
        if (bytes_written < 0) {
            perror("write error");
        }
        close(client_fd);
        free((void *)request);
        return;
    } else if (strcmp(method, "GET") == 0 && strcmp(path, "/") == 0) {
        get_home(client_fd, request);
    } else if (strcmp(method, "POST") == 0 && strcmp(path, "/login") == 0) {
        post_login(client_fd, request);
    } else if (strcmp(method, "GET") == 0 && strcmp(path, "/login") == 0) {
        get_login(client_fd, request);
    } else if (strcmp(method, "GET") == 0 && strcmp(path, "/guestbook") == 0) {
        get_guestbook_page(client_fd, request);
    } else if (strcmp(method, "GET") == 0 && strcmp(path, "/guestbook/list") == 0) {
        get_guestbook_list(client_fd);
    } else if (strcmp(method, "POST") == 0 && strcmp(path, "/guestbook") == 0) {
        post_guestbook_entry(client_fd, request);
    } else if (strcmp(method, "POST") == 0 && strncmp(path, "/guestbook/verify/", 18) == 0) {
        verify_guestbook_entry(client_fd, request);
    } else if (strcmp(method, "POST") == 0 && strncmp(path, "/guestbook/delete/", 18) == 0) {
        delete_guestbook_entry(client_fd, request);
    } else {
        not_found(client_fd);
    }
}
