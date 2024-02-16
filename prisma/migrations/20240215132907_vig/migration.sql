/*
  Warnings:

  - You are about to drop the column `cnes` on the `Production` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `Production` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Production" DROP COLUMN "cnes",
ADD COLUMN     "cityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Production" ADD CONSTRAINT "Production_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
