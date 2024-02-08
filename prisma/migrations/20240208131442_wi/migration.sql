/*
  Warnings:

  - Made the column `cnes` on table `Production` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Production" DROP CONSTRAINT "Production_cnes_fkey";

-- AlterTable
ALTER TABLE "Production" ALTER COLUMN "cnes" SET NOT NULL;
