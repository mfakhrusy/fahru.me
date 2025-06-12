# Makefile

CC = gcc
CFLAGS = -Wall -Wextra -O2
TARGET = server
SRCS = main.c server.c routes.c controllers.c

all: $(TARGET)

$(TARGET): $(SRCS)
	$(CC) $(CFLAGS) -o $(TARGET) $(SRCS)

clean:
	rm -f $(TARGET)
