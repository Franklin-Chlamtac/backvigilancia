-- CreateTable
CREATE TABLE "Occupations" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Occupations_code_key" ON "Occupations"("code");
