#include <stdlib.h>
#include <stdio.h>
#include <string.h>

char* get_db_name() {
    const char *db_path = getenv("DB_PATH");
    const char *db_name = getenv("DB_FILENAME");
    if (!db_name) {
        fprintf(stderr, "DB_FILENAME environment variable not set\n");
        return NULL;
    }
    if (!db_path) {
        fprintf(stderr, "DB_PATH environment variable not set\n");
        return NULL;
    }
    size_t len = strlen(db_path) + strlen(db_name) + 2; // 1 for possible '/', 1 for '\0'
    char *full_db_path = malloc(len);
    if (!full_db_path) {
        fprintf(stderr, "Memory allocation failed for db path\n");
        return NULL;
    }
    snprintf(full_db_path, len, "%s%s", db_path, db_name);
    return full_db_path;
}
