#include <stdio.h>
#include <string.h>
#include <openssl/sha.h>

void hash_sha256(const char *str, char *output) {
    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256((const unsigned char *)str, strlen(str), hash);
    for (int i = 0; i < SHA256_DIGEST_LENGTH; ++i)
        sprintf(output + (i * 2), "%02x", hash[i]);
    output[64] = 0;
}
