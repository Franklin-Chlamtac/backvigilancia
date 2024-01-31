import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  // async listOccupations(req, res) {
  //   try {
  //     const { page, perPage = 50, search } = req.query;

  //     if (search !== "all") {
  //       const occupations = await prisma.$queryRaw`
  //               SELECT *
  //               FROM occupations
  //               WHERE UPPER(name) LIKE UPPER('%${search}%')
  //               ORDER BY name ASC
  //           `;
  //       return res.json({ occupations });
  //     }

  //     if (page === "all") {
  //       const occupations = await prisma.occupations.findMany({
  //         orderBy: {
  //           name: "asc",
  //         },
  //       });
  //       return res.json({ occupations });
  //     }

  //     const pageNumber = parseInt(page) || 1;
  //     const skip = (pageNumber - 1) * perPage;

  //     const occupations = await prisma.occupations.findMany({
  //       orderBy: {
  //         name: "asc",
  //       },
  //       take: perPage,
  //       skip,
  //     });

  //     res.json({ occupations });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

  async listOccupations(req, res) {
    try {
      const { page, perPage = 50, search } = req.query;
      let occupations;

      if (search !== "all") {
        occupations = await prisma.occupations.findMany({
          where: {
            name: {
              contains: search.toUpperCase(),
              mode: "insensitive",
            },
          },
          orderBy: {
            name: "asc",
          },
        });
      } else {
        if (page === "all") {
          occupations = await prisma.occupations.findMany({
            orderBy: {
              name: "asc",
            },
          });
        } else {
          const pageNumber = parseInt(page) || 1;
          const skip = (pageNumber - 1) * perPage;

          occupations = await prisma.occupations.findMany({
            orderBy: {
              name: "asc",
            },
            take: parseInt(perPage),
            skip,
          });
        }
      }

      res.json({ occupations });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
