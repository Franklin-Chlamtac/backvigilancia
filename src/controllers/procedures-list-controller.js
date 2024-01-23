import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async listProcedures(req, res) {
    try {
      const procedures = await prisma.Procedures.findMany({
        where: {
          code: {
            startsWith: "010201",
          },
        },
        orderBy: {
          name: "asc",
        },
      });

      res.json({ procedures });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
