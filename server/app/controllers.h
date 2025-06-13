// controllers.h
#ifndef CONTROLLERS_H
#define CONTROLLERS_H

#include <stddef.h>

void not_found(int client_fd);
void login(int client_fd, const char* request);
void get_login(int client_fd, const char *request);

#endif
