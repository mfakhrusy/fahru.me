// main.c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "server.h"
#include "routes.h"

// Helper function to consume the rest of a line from a file stream
void consume_rest_of_line(FILE *fp) {
    int c;
    while ((c = fgetc(fp)) != '\n' && c != EOF);
}

/**
 * @brief Reads a .env file and loads variables into the process environment.
 * * @param filename The path to the .env file.
 * @return 0 on success, -1 on failure to open the file.
 */
int load_env(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        perror("Error opening .env file");
        return -1;
    }

    char line[256];
    while (fgets(line, sizeof(line), file)) {
        // Check if the line was too long for the buffer and discard the rest
        if (strchr(line, '\n') == NULL && !feof(file)) {
            fprintf(stderr, "Warning: A line in %s is too long and was truncated.\n", filename);
            consume_rest_of_line(file);
            continue;
        }
        
        // Clean the line by removing the trailing newline
        line[strcspn(line, "\n")] = 0;

        // Skip comments or empty lines
        if (line[0] == '#' || line[0] == '\0') {
            continue;
        }

        char *equal_sign = strchr(line, '=');
        if (equal_sign != NULL) {
            *equal_sign = '\0'; // Split the string into name and value
            char *name = line;
            char *value = equal_sign + 1;

            // Handle surrounding quotes (optional but good practice)
            if (strlen(value) > 1 && value[0] == '"' && value[strlen(value) - 1] == '"') {
                value[strlen(value) - 1] = '\0';
                value++;
            }

            if (setenv(name, value, 1) != 0) {
                perror("Error setting environment variable");
            }
        }
    }

    fclose(file);
    return 0; // Success
}

int main(int argc, char *argv[]) {
    int is_production = 0;

    // Check for "--production" argument
    if (argc > 1 && strcmp(argv[1], "--production") == 0) {
        is_production = 1;
    }

    // Load environment variables from .env file only if not production
    if (!is_production) {
        if (load_env(".env") != 0) {
            fprintf(stderr, "Failed to load environment variables from .env file\n");
            return 1; // Exit with error if .env loading fails
        }
    }

    start_server(8080, handle_request);
    return 0;
}
