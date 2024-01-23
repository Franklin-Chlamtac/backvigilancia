-- CreateTable
CREATE TABLE "Procedures" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "min_age" INTEGER NOT NULL,
    "max_age" INTEGER NOT NULL,
    "as_value" INTEGER NOT NULL,
    "hs_value" INTEGER NOT NULL,
    "ps_value" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Procedures_code_key" ON "Procedures"("code");
