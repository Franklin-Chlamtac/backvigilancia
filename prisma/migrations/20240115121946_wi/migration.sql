/*
  Warnings:

  - A unique constraint covering the columns `[cnes]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "City_cnes_key" ON "City"("cnes");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("cnes") ON DELETE RESTRICT ON UPDATE CASCADE;
