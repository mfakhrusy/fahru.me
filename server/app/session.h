#include <stddef.h>

int generate_session_token(char *out, size_t out_len);
int insert_session(sqlite3 *db, const char *username, const char *session_token);
int check_user_session(char *session_token);