-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birth_at" TIMESTAMP(3) NOT NULL,
    "sex" TEXT NOT NULL,
    "marital_status" TEXT NOT NULL,
    "partner_name" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sexual_orientation" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "phone_1" TEXT NOT NULL,
    "phone_2" TEXT NOT NULL,
    "phone_3" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "forwarded" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "therapist_phone" TEXT NOT NULL,
    "medical_phone" TEXT NOT NULL,
    "internment" TEXT NOT NULL,
    "admission_diagnosis" TEXT NOT NULL,
    "discharge_diagnosis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_cpf_key" ON "Guest"("cpf");
