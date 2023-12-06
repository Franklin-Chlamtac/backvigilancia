-- CreateTable
CREATE TABLE "Responsible" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Responsible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Establishment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsibleId" TEXT NOT NULL,

    CONSTRAINT "Establishment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Responsible_id_key" ON "Responsible"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Responsible_cpf_key" ON "Responsible"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Establishment_id_key" ON "Establishment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Establishment_document_key" ON "Establishment"("document");

-- AddForeignKey
ALTER TABLE "Establishment" ADD CONSTRAINT "Establishment_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Responsible"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
