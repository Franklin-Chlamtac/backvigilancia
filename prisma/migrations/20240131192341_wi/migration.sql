-- AlterTable
ALTER TABLE "Procedures" ADD CONSTRAINT "Procedures_pkey" PRIMARY KEY ("code");

-- AddForeignKey
ALTER TABLE "Production" ADD CONSTRAINT "Production_procedure_code_fkey" FOREIGN KEY ("procedure_code") REFERENCES "Procedures"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
