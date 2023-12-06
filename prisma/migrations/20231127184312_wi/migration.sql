/*
  Warnings:

  - Added the required column `cpf` to the `Professional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Professional" ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
