# Makefile

CC = gcc
CFLAGS = -Wall -Wextra -O2
TARGET = server
SRCS = main.c server.c routes.c controllers.c crypto.c lib/cjson/cJSON.c
LIBS = -lsqlite3 -lssl
CUSTOM_LIBS = -lcrypto

all: $(TARGET)

$(TARGET): $(SRCS)
	$(CC) $(CFLAGS) -o $(TARGET) $(SRCS) $(LIBS) $(CUSTOM_LIBS)

clean:
	rm -f $(TARGET)
