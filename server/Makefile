# Makefile

CC = gcc
INCLUDES = -Ilib
CFLAGS = -Wall -Wextra -O2
TARGET = server
SRCS = \
	app/main.c \
	app/server.c \
	app/routes.c \
	app/controllers.c \
	app/crypto.c \
	app/session.c \
	lib/cjson/cJSON.c
LIBS = -lsqlite3 -lssl
CUSTOM_LIBS = -lcrypto

all: $(TARGET)

$(TARGET): $(SRCS)
	$(CC) $(INCLUDES) $(CFLAGS) -o $(TARGET) $(SRCS) $(LIBS) $(CUSTOM_LIBS)

clean:
	rm -f $(TARGET)
