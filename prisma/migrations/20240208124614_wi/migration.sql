-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityId_fkey";

-- AlterTable
ALTER TABLE "Production" ALTER COLUMN "cnes" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Production" ADD CONSTRAINT "Production_cnes_fkey" FOREIGN KEY ("cnes") REFERENCES "City"("cnes") ON DELETE SET NULL ON UPDATE CASCADE;
