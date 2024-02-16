import { createId } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createComplaint(req, res) {
    try {
      const { name, complaint, userId, cityId } = req.body;

      const complaints = await prisma.complaint.create({
        data: {
          id: createId(),
          name,
          complaint: complaint?.toUpperCase(),
          userId,
          cityId,
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

  // async listOpenComplaints(req, res) {
  //   try {
  //     const { page, perPage, search } = req.query;

  //     if (search) {
  //       const searchUpperCase = search.toUpperCase();

  //       const totalCount = await prisma.complaint.count({
  //         where: {
  //           OR: [
  //             {
  //               complaint: {
  //                 contains: searchUpperCase,
  //               },
  //               name: {
  //                 contains: searchUpperCase,
  //               },
  //             },
  //           ],
  //         },
  //       });

  //       const complaints = await prisma.complaint.findMany({
  //         where: {
  //           OR: [
  //             {
  //               complaint: {
  //                 contains: searchUpperCase,
  //               },
  //               name: {
  //                 contains: searchUpperCase,
  //               },
  //             },
  //           ],
  //         },
  //         include: {
  //           User: {
  //             select: {
  //               name: true,
  //             },
  //           },
  //         },
  //         orderBy: {
  //           created_at: "asc",
  //         },
  //       });

  //       return res.json({ total: totalCount, complaints });
  //     }

  //     if (!page || page === "all") {
  //       const complaints = await prisma.complaint.findMany({
  //         orderBy: {
  //           created_at: "asc",
  //         },
  //         include: {
  //           User: {
  //             select: {
  //               name: true,
  //             },
  //           },
  //         },
  //       });

  //       const totalCount = complaints.length;
  //       const totalPages = 1;

  //       return res.json({
  //         total: totalCount,
  //         total_pages: totalPages,
  //         complaints,
  //       });
  //     }

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

  async listOpenComplaints(req, res) {
    try {
      const { page, perPage, search, cityId } = req.query;

      if (search) {
        const searchUpperCase = search.toUpperCase();

        const totalCount = await prisma.complaint.count({
          where: {
            AND: [
              { situation: false },
              { cityId: cityId },
              {
                OR: [
                  { complaint: { contains: searchUpperCase } },
                  { name: { contains: searchUpperCase } },
                ],
              },
            ],
          },
        });

        const complaints = await prisma.complaint.findMany({
          where: {
            AND: [
              { situation: false },
              { cityId: cityId },
              {
                OR: [
                  { complaint: { contains: searchUpperCase } },
                  { name: { contains: searchUpperCase } },
                ],
              },
            ],
          },
          include: {
            User: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            created_at: "asc",
          },
        });

        return res.json({ total: totalCount, complaints });
      } else {
        const pageNumber = parseInt(page) || 1;
        const itemsPerPage = parseInt(perPage) || 10;

        const totalCount = await prisma.complaint.count({
          where: {
            situation: false,
            cityId: cityId,
          },
        });
        const totalPages = Math.ceil(totalCount / itemsPerPage);

        const skip = (pageNumber - 1) * itemsPerPage;
        const take = itemsPerPage;

        const complaints = await prisma.complaint.findMany({
          where: {
            situation: false,
            cityId: cityId,
          },
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

        return res.json({
          total: totalCount,
          total_pages: totalPages,
          complaints,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async listCloseComplaints(req, res) {
    try {
      const { page, perPage, search, cityId } = req.query;

      if (search) {
        const searchUpperCase = search.toUpperCase();

        const totalCount = await prisma.complaint.count({
          where: {
            AND: [
              { situation: true },
              { cityId: cityId },
              {
                OR: [{ complaint: { contains: searchUpperCase } }],
              },
            ],
          },
        });

        const complaints = await prisma.complaint.findMany({
          where: {
            AND: [
              { situation: true },
              { cityId: cityId },
              {
                OR: [{ complaint: { contains: searchUpperCase } }],
              },
            ],
          },
          include: {
            User: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            resolved_at: "desc",
          },
        });

        return res.json({ total: totalCount, complaints });
      } else {
        const pageNumber = parseInt(page) || 1;
        const itemsPerPage = parseInt(perPage) || 10;

        const totalCount = await prisma.complaint.count({
          where: {
            situation: true,
            cityId: cityId,
          },
        });
        const totalPages = Math.ceil(totalCount / itemsPerPage);

        const skip = (pageNumber - 1) * itemsPerPage;
        const take = itemsPerPage;

        const complaints = await prisma.complaint.findMany({
          where: {
            situation: true,
            cityId: cityId,
          },
          skip,
          take,
          orderBy: {
            resolved_at: "desc",
          },
          include: {
            User: {
              select: {
                name: true,
              },
            },
          },
        });

        return res.json({
          total: totalCount,
          total_pages: totalPages,
          complaints,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async resolveComplaint(req, res) {
    try {
      const { id } = req.params;
      const { userId, resolved_at, situation } = req.body;

      const complaint = await prisma.complaint.update({
        where: {
          id: id,
        },
        data: {
          userId,
          resolved_at,
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
          complaint: complaint?.toUpperCase(),
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
