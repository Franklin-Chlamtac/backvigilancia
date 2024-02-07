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
  // async listResponsibles(req, res) {
  //   try {
  //     const { page, perPage } = req.query;
  //     const pageNumber = parseInt(page) || 1;
  //     const itemsPerPage = parseInt(perPage) || 10;

  //     const totalCount = await prisma.responsible.count();
  //     const totalPages = Math.ceil(totalCount / itemsPerPage);

  //     const skip = (pageNumber - 1) * itemsPerPage;
  //     const take = itemsPerPage;

  //     const responsibles = await prisma.responsible.findMany({
  //       skip,
  //       take,
  //       orderBy: {
  //         created_at: "asc",
  //       },
  //     });
  //     res.json({ total: totalCount, total_pages: totalPages, responsibles });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },
  async listResponsibles(req, res) {
    try {
      const { page, perPage, search } = req.query;

      if (search) {
        const searchUpperCase = search.toUpperCase();

        const totalCount = await prisma.responsible.count({
          where: {
            OR: [
              {
                name: {
                  contains: searchUpperCase,
                },
              },
            ],
          },
        });

        const responsibles = await prisma.responsible.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: searchUpperCase,
                },
              },
            ],
          },
          orderBy: {
            created_at: "asc",
          },
        });

        return res.json({ total: totalCount, responsibles });
      }

      if (!page || page === "all") {
        const responsibles = await prisma.responsible.findMany({
          orderBy: {
            created_at: "asc",
          },
        });

        res.json({ responsibles });
        return;
      }

      const pageNumber = parseInt(page) || 1;
      const itemsPerPage = parseInt(perPage) || 10;

      const totalCount = await prisma.responsible.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const skip = (pageNumber - 1) * itemsPerPage;
      const take = itemsPerPage;

      const responsibles = await prisma.responsible.findMany({
        skip,
        take,
        orderBy: {
          created_at: "asc",
        },
      });

      res.json({ total: totalCount, total_pages: totalPages, responsibles });
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
