import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async listOccupations(req, res) {
    try {
      const { page = 1, perPage = 50 } = req.query;
      const skip = (page - 1) * perPage;

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

