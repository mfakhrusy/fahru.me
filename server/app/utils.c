#include <string.h>
#include <stdio.h>

// Extracts a field value from a URL-encoded body string into the buffer
void extract_url_encoded_form_field(const char *body, const char *field, char *buf, size_t maxlen) {
    printf("extract_url_encoded_form_field called with body: %s, field: %s, maxlen: %zu\n", body, field, maxlen);
    if (!body || !field || !buf || maxlen == 0) return;

    const char *start = strstr(body, field);
    if (start && start[strlen(field)] == '=') {
        start += strlen(field) + 1;

        const char *end = strchr(start, '&');
        size_t len = end ? (size_t)(end - start) : strlen(start);
        if (len >= maxlen) len = maxlen - 1;

        strncpy(buf, start, len);
        buf[len] = '\0';
    } else {
        buf[0] = '\0'; // Clear the buffer if not found
    }
}
