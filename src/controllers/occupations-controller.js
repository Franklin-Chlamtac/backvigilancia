import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async listOccupations(req, res) {
    try {
      const { page, perPage = 50 } = req.query;

      if (page === "all") {
        const occupations = await prisma.occupations.findMany({
          orderBy: {
            name: "asc",
          },
        });

        return res.json({ occupations });
      }

      const pageNumber = parseInt(page) || 1;
      const skip = (pageNumber - 1) * perPage;

      const occupations = await prisma.occupations.findMany({
        orderBy: {
          name: "asc",
        },
        take: perPage,
        skip,
      });

      res.json({ occupations });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
