// server.h
#ifndef SERVER_H
#define SERVER_H

typedef void (*request_handler_t)(int client_fd, const char *request);

void start_server(int port, request_handler_t handler);

#endif
