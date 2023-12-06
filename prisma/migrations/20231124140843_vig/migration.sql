/*
  Warnings:

  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Guest";

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_id_key" ON "City"("id");
