// controllers.h
#ifndef CONTROLLERS_H
#define CONTROLLERS_H

#include <stddef.h>

void not_found(int client_fd);
void post_login(int client_fd, const char* request);
void get_login(int client_fd, const char* request);
void get_home(int client_fd, const char* request);
void get_guestbook_page(int client_fd, const char* request);
void get_guestbook_list(int client_fd);
void post_guestbook_entry(int client_fd, const char* request);
void verify_guestbook_entry(int client_fd, const char* request);
void delete_guestbook_entry(int client_fd, const char* request);

#endif
