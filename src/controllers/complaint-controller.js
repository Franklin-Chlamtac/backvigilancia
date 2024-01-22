import { createId } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createComplaint(req, res) {
    try {
      const { name, complaint, userId } = req.body;

      const complaints = await prisma.complaint.create({
        data: {
          id: createId(),
          name,
          complaint,
          userId,
        },
      });
      res.json({
        success: true,
        message: "Reclamação registrada com sucesso.",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // async listComplaints(req, res) {
  //   try {
  //     const { page, perPage } = req.query;
  //     const pageNumber = parseInt(page) || 1;
  //     const itemsPerPage = parseInt(perPage) || 10;

  //     const totalCount = await prisma.complaint.count();
  //     const totalPages = Math.ceil(totalCount / itemsPerPage);

  //     const skip = (pageNumber - 1) * itemsPerPage;
  //     const take = itemsPerPage;

  //     const complaints = await prisma.complaint.findMany({
  //       skip,
  //       take,
  //       orderBy: {
  //         created_at: "asc",
  //       },
  //       include: {
  //         User: {
  //           select: {
  //             name: true,
  //           },
  //         },
  //       },
  //     });
  //     res.json({ total: totalCount, total_pages: totalPages, complaints });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

  async listComplaints(req, res) {
    try {
      const { page, perPage } = req.query;

      if (!page || page === "all") {
        const complaints = await prisma.complaint.findMany({
          orderBy: {
            created_at: "asc",
          },
          include: {
            User: {
              select: {
                name: true,
              },
            },
          },
        });

        const totalCount = complaints.length;
        const totalPages = 1;

        return res.json({
          total: totalCount,
          total_pages: totalPages,
          complaints,
        });
      }

      const pageNumber = parseInt(page) || 1;
      const itemsPerPage = parseInt(perPage) || 10;

      const totalCount = await prisma.complaint.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const skip = (pageNumber - 1) * itemsPerPage;
      const take = itemsPerPage;

      const complaints = await prisma.complaint.findMany({
        skip,
        take,
        orderBy: {
          created_at: "asc",
        },
        include: {
          User: {
            select: {
              name: true,
            },
          },
        },
      });

      res.json({ total: totalCount, total_pages: totalPages, complaints });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async resolveComplaint(req, res) {
    try {
      const { id } = req.params;
      const { userId, resolved_at, situation } = req.body;
      const currentDate = new Date();

      const complaint = await prisma.complaint.update({
        where: {
          id: id,
        },
        data: {
          userId,
          resolved_at: currentDate,
          situation,
        },
      });
      res.json({
        success: true,
        message: "Reclamação resolvida com sucesso",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateComplaint(req, res) {
    try {
      const { id } = req.params;
      const { userId, complaint, name } = req.body;

      const complaints = await prisma.complaint.update({
        where: {
          id: id,
        },
        data: {
          userId,
          complaint,
          name,
        },
      });
      res.json({
        success: true,
        message: "Reclamação atualizada com sucesso",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
