import { createId } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createProfessional(req, res) {
    try {
      const { name, cpf, cbo, cityId } = req.body;
      const professionalAlreadyExists = await prisma.professional.findFirst({
        where: { cpf },
      });
      if (professionalAlreadyExists) {
        return res.status(400).json({ error: "Profissional já cadastrado" });
      }

      const professional = await prisma.professional.create({
        data: {
          id: createId(),
          name,
          cpf,
          cbo,
          cityId,
        },
      });
      res.json({ success: true, message: "Profissional criado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // async listProfessionals(req, res) {
  //   try {
  //     const professionals = await prisma.professional.findMany({
  //       orderBy: {
  //         created_at: "asc",
  //       },
  //       include: {
  //         city: {
  //           select: {
  //             name: true,
  //           },
  //         },
  //       },
  //     });
  //     res.json(professionals);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },
  async listProfessionals(req, res) {
    try {
      const { page, perPage } = req.query;

      if (!page || page === "all") {
        const professionals = await prisma.professional.findMany({
          orderBy: {
            created_at: "asc",
          },
          include: {
            city: {
              select: {
                name: true,
              },
            },
          },
        });

        res.json(professionals);
        return;
      }

      const pageNumber = parseInt(page) || 1;
      const itemsPerPage = parseInt(perPage) || 10;

      const totalCount = await prisma.professional.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const skip = (pageNumber - 1) * itemsPerPage;
      const take = itemsPerPage;

      const professionals = await prisma.professional.findMany({
        skip,
        take,
        orderBy: {
          created_at: "asc",
        },
        include: {
          city: {
            select: {
              name: true,
            },
          },
        },
      });

      res.json({ total: totalCount, total_pages: totalPages, professionals });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateProfessionals(req, res) {
    try {
      const { id } = req.params;
      const { name, cpf, cbo, cityId } = req.body;

      const professional = await prisma.professional.update({
        where: {
          id: id,
        },
        data: {
          name,
          cpf,
          cbo,
          cityId,
        },
      });
      res.json({
        success: true,
        message: "Profissional atualizado com sucesso.",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
