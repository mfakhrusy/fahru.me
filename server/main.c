// main.c
#include "server.h"
#include "routes.h"

int main() {
    start_server(8080, handle_request);
    return 0;
}
