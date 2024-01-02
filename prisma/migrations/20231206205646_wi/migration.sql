-- CreateTable
CREATE TABLE "Production" (
    "id" TEXT NOT NULL,
    "cnes" TEXT NOT NULL,
    "competence" TIMESTAMP(3) NOT NULL,
    "occupation_code" TEXT NOT NULL,
    "procedure_code" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Production_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Production_id_key" ON "Production"("id");
