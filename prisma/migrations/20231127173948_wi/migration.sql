-- AlterTable
ALTER TABLE "Establishment" ALTER COLUMN "number" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Professional" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cbo" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "Professional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professional_id_key" ON "Professional"("id");

-- AddForeignKey
ALTER TABLE "Professional" ADD CONSTRAINT "Professional_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
