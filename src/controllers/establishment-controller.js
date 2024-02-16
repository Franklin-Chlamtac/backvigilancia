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
        license,
        cityId,
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
          license,
          cityId,
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
  // async listEstablishments(req, res) {
  //   try {
  //     const { page, perPage } = req.query;
  //     const pageNumber = parseInt(page) || 1;
  //     const itemsPerPage = parseInt(perPage) || 10;

  //     const totalCount = await prisma.establishment.count();
  //     const totalPages = Math.ceil(totalCount / itemsPerPage);

  //     const skip = (pageNumber - 1) * itemsPerPage;
  //     const take = itemsPerPage;
  //     const establishments = await prisma.establishment.findMany({
  //       skip,
  //       take,
  //       orderBy: {
  //         created_at: "asc",
  //       },
  //       include: {
  //         responsible: {
  //           select: {
  //             name: true,
  //           },
  //         },
  //       },
  //     });
  //     res.json({ total: totalCount, total_pages: totalPages, establishments });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

  async listEstablishments(req, res) {
    try {
      const { page, perPage, search, cityId } = req.query;

      if (search) {
        const searchUpperCase = search.toUpperCase();

        const totalCount = await prisma.establishment.count({
          where: {
            AND: [
              { cityId: cityId },
              {
                OR: [
                  {
                    name: {
                      contains: searchUpperCase,
                    },
                  },
                ],
              },
            ],
          },
        });

        const establishments = await prisma.establishment.findMany({
          where: {
            AND: [
              { cityId: cityId },
              {
                OR: [
                  {
                    name: {
                      contains: searchUpperCase,
                    },
                  },
                ],
              },
            ],
          },
          orderBy: {
            created_at: "asc",
          },
        });

        return res.json({ total: totalCount, establishments });
      }

      if (!page || page === "all") {
        const establishments = await prisma.establishment.findMany({
          where: {
            cityId: cityId,
          },
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

        res.json({ establishments });
        return;
      }

      const pageNumber = parseInt(page) || 1;
      const itemsPerPage = parseInt(perPage) || 10;

      const totalCount = await prisma.establishment.count({
        where: {
          cityId: cityId,
        },
      });
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const skip = (pageNumber - 1) * itemsPerPage;
      const take = itemsPerPage;
      const establishments = await prisma.establishment.findMany({
        where: {
          cityId: cityId,
        },
        skip,
        take,
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

      res.json({ total: totalCount, total_pages: totalPages, establishments });
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
        last_inspection,
        license,
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
          last_inspection,
          license,
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
  // async inspectEstablishment(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const { last_inspection } = req.body;

  //     const establishment = await prisma.establishment.update({
  //       where: {
  //         id: id,
  //       },
  //       data: {
  //         last_inspection,
  //       },
  //     });
  //     res.json({
  //       success: true,
  //       message: "Estabelecimento atualizado com sucesso",
  //     });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },
};
