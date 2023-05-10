-- CreateTable
CREATE TABLE "guest_book" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "website" TEXT,
    "mastodon" TEXT,
    "message" TEXT NOT NULL,

    CONSTRAINT "guest_book_pkey" PRIMARY KEY ("id")
);
