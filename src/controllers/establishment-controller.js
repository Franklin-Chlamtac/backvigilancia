import { createId } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createEstablishment(req, res) {
    try {
      const {
        name,
        document,
        street,
        neighborhood,
        number,
        type,
        responsibleId,
      } = req.body;

      const establishmentAlreadyExists = await prisma.establishment.findFirst({
        where: { document },
      });
      if (establishmentAlreadyExists) {
        return res.status(400).json({ error: "Estabelecimento já cadastrado" });
      }
      const establishment = await prisma.establishment.create({
        data: {
          id: createId(),
          name,
          document,
          street,
          neighborhood,
          number,
          type,
          responsibleId,
        },
      });
      res.json({
        success: true,
        message: "Estabelecimento cadastrado com sucesso.",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async listEstablishments(req, res) {
    try {
      const establishments = await prisma.establishment.findMany({
        orderBy: {
          created_at: "asc",
        },
        include: {
          responsible: {
            select: {
              name: true,
            },
          },
        },
      });
      res.json(establishments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateEstablishment(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        document,
        street,
        neighborhood,
        number,
        type,
        responsibleId,
      } = req.body;

      const establishment = await prisma.establishment.update({
        where: {
          id: id,
        },
        data: {
          name,
          document,
          street,
          neighborhood,
          number,
          type,
          responsibleId,
        },
      });
      res.json({
        success: true,
        message: "Estabelecimento atualizado com sucesso",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
