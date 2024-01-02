import { createId } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createProcedure(req, res) {
    try {
      const { professionalId, establishmentId, procedure_code } = req.body;

      const procedure = await prisma.procedure.create({
        data: {
          id: createId(),
          professionalId,
          establishmentId,
          procedure_code,
        },
      });
      res.json({ success: true, message: "Procedimento feito com sucesso." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async listProcedures(req, res) {
    try {
      const { page, perPage } = req.query;
      const pageNumber = parseInt(page) || 1;
      const itemsPerPage = parseInt(perPage) || 10;

      const totalCount = await prisma.procedure.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const skip = (pageNumber - 1) * itemsPerPage;
      const take = itemsPerPage;
      const procedures = await prisma.procedure.findMany({
        skip,
        take,
        orderBy: {
          created_at: "asc",
        },
      });
      res.json({
        total: totalCount,
        total_pages: totalPages,
        procedures,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateProcedure(req, res) {
    try {
      const { id } = req.params;
      const { professionalId, establishmentId, procedure_code } = req.body;

      const procedure = await prisma.procedure.update({
        where: {
          id: id,
        },
        data: {
          professionalId,
          establishmentId,
          procedure_code,
        },
      });
      res.json({
        success: true,
        message: "Procedimento atualizado com sucesso.",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
