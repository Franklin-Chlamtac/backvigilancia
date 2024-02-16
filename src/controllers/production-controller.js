import { createId } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createProduction(req, res) {
    try {
      const {
        cnes,
        competence,
        occupation_code,
        procedure_code,
        age,
        quantity,
        cityId,
      } = req.body;

      const production = await prisma.Production.create({
        data: {
          id: createId(),
          cnes,
          competence,
          occupation_code,
          procedure_code,
          age,
          quantity,
          cityId,
        },
      });
      res.json({ success: true, message: "Produção criado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async listProductions(req, res) {
    try {
      const { page, perPage, search, cityId } = req.query;

      if (search) {
        const searchUpperCase = search.toUpperCase();

        const totalCount = await prisma.Production.count({
          where: {
            AND: [
              { cityId: cityId },
              {
                OR: [
                  {
                    procedure: {
                      name: {
                        contains: searchUpperCase,
                      },
                    },
                  },
                ],
              },
            ],
          },
        });

        const productions = await prisma.Production.findMany({
          where: {
            AND: [
              { cityId: cityId },
              {
                OR: [
                  {
                    procedure: {
                      name: {
                        contains: searchUpperCase,
                      },
                    },
                  },
                ],
              },
            ],
          },
          include: {
            procedure: true,
          },
          orderBy: {
            created_at: "asc",
          },
        });

        return res.json({ total: totalCount, productions });
      }

      if (!page || page === "all") {
        const productions = await prisma.production.findMany({
          where: {
            cityId: cityId,
          },
          include: {
            procedure: true,
          },
          orderBy: {
            created_at: "desc",
          },
        });

        const totalCount = productions.length;
        res.json({ total: totalCount, productions });
        return;
      }

      const pageNumber = parseInt(page) || 1;
      const itemsPerPage = parseInt(perPage) || 10;

      const totalCount = await prisma.production.count({
        where: {
          cityId: cityId,
        },
      });
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const skip = (pageNumber - 1) * itemsPerPage;
      const take = itemsPerPage;

      const productions = await prisma.production.findMany({
        where: {
          cityId: cityId,
        },
        include: {
          procedure: true,
        },
        orderBy: {
          created_at: "desc",
        },
        skip,
        take,
      });

      res.json({ total: totalCount, total_pages: totalPages, productions });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateProduction(req, res) {
    try {
      const { id } = req.params;
      const {
        cnes,
        competence,
        occupation_code,
        procedure_code,
        age,
        quantity,
      } = req.body;

      const production = await prisma.Production.update({
        where: {
          id: id,
        },
        data: {
          cnes,
          competence,
          occupation_code,
          procedure_code,
          age,
          quantity,
        },
      });

      res.json(production);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
