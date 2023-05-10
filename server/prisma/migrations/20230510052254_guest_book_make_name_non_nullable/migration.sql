/*
  Warnings:

  - Made the column `name` on table `guest_book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "guest_book" ALTER COLUMN "name" SET NOT NULL;
