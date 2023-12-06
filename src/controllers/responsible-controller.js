import { createId } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createResponsible(req, res) {
    try {
      const { name, cpf } = req.body;

      const responsibleAlreadyExists = await prisma.responsible.findFirst({
        where: { cpf },
      });

      const responsible = await prisma.responsible.create({
        data: {
          id: createId(),
          name,
          cpf,
        },
      });
      res.json({ success: true, message: "Responsável criado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async listResponsibles(req, res) {
    try {
      const responsibles = await prisma.responsible.findMany({
        orderBy: {
          created_at: "asc",
        },
      });
      res.json(responsibles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateResponsible(req, res) {
    try {
      const { id } = req.params;
      const { name, cpf } = req.body;

      const responsible = await prisma.responsible.update({
        where: {
          id: id,
        },
        data: {
          name,
          cpf,
        },
      });
      res.json({
        success: true,
        message: "Responsável atualizado com sucesso.",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
