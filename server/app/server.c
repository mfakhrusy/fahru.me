// server.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <netinet/in.h>
#include "server.h"

void start_server(int port, request_handler_t handler) {
    int server_fd, client_fd;
    struct sockaddr_in addr;
    int opt = 1;
    // Increase buffer size to 4KB for longer requests
    char buffer[4096] = {0};

    server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd == 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(port);

    if (bind(server_fd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }

    if (listen(server_fd, 5) < 0) {
        perror("listen");
        exit(EXIT_FAILURE);
    }

    printf("Server running on http://localhost:%d\n", port);

    while (1) {
        client_fd = accept(server_fd, NULL, NULL);
        if (client_fd < 0) {
            perror("accept");
            continue;
        }

        // Read request in chunks until end of headers (for HTTP)
        int total_read = 0;
        int read_bytes;
        int header_end = 0;
        memset(buffer, 0, sizeof(buffer));
        while ((read_bytes = read(client_fd, buffer + total_read, sizeof(buffer) - total_read - 1)) > 0) {
            total_read += read_bytes;
            buffer[total_read] = '\0';
            // Look for end of HTTP headers: "\r\n\r\n"
            if (strstr(buffer, "\r\n\r\n") != NULL) {
                header_end = 1;
                break;
            }
            if (total_read >= sizeof(buffer) - 1) {
                // Buffer full, stop reading
                break;
            }
        }
        if (total_read > 0) {
            buffer[total_read] = '\0';
            handler(client_fd, buffer);
        }

        close(client_fd);
    }

    close(server_fd);
}
