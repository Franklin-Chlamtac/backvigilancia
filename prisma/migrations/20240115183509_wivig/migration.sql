/*
  Warnings:

  - Added the required column `name_clean` to the `Occupations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Occupations" ADD COLUMN     "name_clean" TEXT NOT NULL;
