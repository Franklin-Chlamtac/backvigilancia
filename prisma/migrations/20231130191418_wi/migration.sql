/*
  Warnings:

  - You are about to drop the column `professionalId` on the `Procedure` table. All the data in the column will be lost.
  - You are about to drop the `Professional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Procedure" DROP CONSTRAINT "Procedure_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "Professional" DROP CONSTRAINT "Professional_cityId_fkey";

-- AlterTable
ALTER TABLE "Procedure" DROP COLUMN "professionalId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cbo" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Professional";

-- AddForeignKey
ALTER TABLE "Procedure" ADD CONSTRAINT "Procedure_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
