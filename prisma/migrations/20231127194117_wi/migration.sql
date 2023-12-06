-- CreateTable
CREATE TABLE "Procedure" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "establishmentId" TEXT NOT NULL,
    "procedure_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Procedure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Procedure_id_key" ON "Procedure"("id");

-- AddForeignKey
ALTER TABLE "Procedure" ADD CONSTRAINT "Procedure_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procedure" ADD CONSTRAINT "Procedure_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
