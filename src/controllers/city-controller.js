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
  // async listCities(req, res) {
  //   try {
  //     const { page, perPage } = req.query;
  //     if (!page || page === "all") {
  //       const cities = await prisma.city.findMany({
  //         orderBy: {
  //           createdAt: "asc",
  //         },
  //         include: {
  //           city: {
  //             select: {
  //               name: true,
  //               cnes: true,
  //             },
  //           },
  //         },
  //       });

  //       return res.json({
  //         total: cities.length,
  //         cities,
  //       });
  //     }
  //     const pageNumber = parseInt(page) || 1;
  //     const itemsPerPage = parseInt(perPage) || 10;

  //     const totalCount = await prisma.city.count();
  //     const totalPages = Math.ceil(totalCount / itemsPerPage);

  //     const skip = (pageNumber - 1) * itemsPerPage;
  //     const take = itemsPerPage;

  //     const cities = await prisma.city.findMany({
  //       skip,
  //       take,
  //       orderBy: {
  //         created_at: "asc",
  //       },
  //     });
  //     res.json({ total: totalCount, total_pages: totalPages, cities });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },
  async listCities(req, res) {
    try {
      const { page, perPage } = req.query;

      if (!page || page === "all") {
        const cities = await prisma.city.findMany({
          orderBy: {
            created_at: "asc",
          },
        });

        const totalCount = cities.length;
        const totalPages = 1;

        return res.json({
          total: totalCount,
          cities,
          total_pages: totalPages,
        });
      }

      const pageNumber = parseInt(page) || 1;
      const itemsPerPage = parseInt(perPage) || 10;

      const totalCount = await prisma.city.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const skip = (pageNumber - 1) * itemsPerPage;
      const take = itemsPerPage;

      const cities = await prisma.city.findMany({
        skip,
        take,
        orderBy: {
          created_at: "asc",
        },
      });

      res.json({ total: totalCount, total_pages: totalPages, cities });
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
