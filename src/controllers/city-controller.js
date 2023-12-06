import { createId } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createCity(req, res) {
    try {
      const { name, cnes } = req.body;
      const cnesAlreadyExists = await prisma.city.findFirst({
        where: { cnes },
      });

      const city = await prisma.city.create({
        data: {
          id: createId(),
          name,
          cnes,
        },
      });
      res.json({ success: true, message: "Município criado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async listCities(req, res) {
    try {
      const cities = await prisma.city.findMany({
        orderBy: {
          created_at: "asc",
        },
      });
      res.json(cities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateCity(req, res) {
    try {
      const { id } = req.params;
      const { name, cnes } = req.body;

      const city = await prisma.city.update({
        where: {
          id: id,
        },
        data: {
          name,
          cnes,
        },
      });
      res.json({
        success: true,
        message: "Município atualizado com sucesso.",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
