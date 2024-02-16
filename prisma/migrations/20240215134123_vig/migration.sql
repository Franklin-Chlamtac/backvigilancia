/*
  Warnings:

  - Added the required column `cnes` to the `Production` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Production" ADD COLUMN     "cnes" TEXT NOT NULL;
