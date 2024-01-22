import { PrismaClient } from "@prisma/client";
import { hashText } from "../libs/encryption";
import { createId } from "@paralleldrive/cuid2";

const prisma = new PrismaClient();

export default {
  async createUser(req, res) {
    try {
      const { name, cpf, password, role, cityId, cbo, cns, phone } = req.body;
      const userAlreadyExists = await prisma.user.findFirst({ where: { cpf } });

      if (userAlreadyExists) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await hashText(password);
      const user = await prisma.user.create({
        data: {
          id: createId(),
          name,
          cpf,
          password: hashedPassword,
          role,
          cityId,
          cbo,
          cns,
          phone,
        },
      });
      res.json({ success: true, message: "Usuário criado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // async listUsers(req, res) inso{
  //   try {
  //     const { page, perPage } = req.query;
  //     const pageNumber = parseInt(page) || 1;
  //     const itemsPerPage = parseInt(perPage) || 10;

  //     const skip = (pageNumber - 1) * itemsPerPage;
  //     const take = itemsPerPage;

  //     const users = await prisma.user.findMany({
  //       skip,
  //       take,
  //       orderBy: {
  //         createdAt: "asc",
  //       },
  //       include: {
  //         city: {
  //           select: {
  //             name: true,
  //             cnes: true,
  //           },
  //         },
  //       },
  //     });
  //     res.json(users);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },
  async listUsers(req, res) {
    try {
      const { page, perPage } = req.query;
      if (!page || page === "all") {
        const users = await prisma.user.findMany({
          orderBy: {
            createdAt: "asc",
          },
          include: {
            city: {
              select: {
                name: true,
                cnes: true,
              },
            },
          },
        });

        return res.json({
          total: users.length,
          users,
        });
      }
      const pageNumber = parseInt(page) || 1;
      const itemsPerPage = parseInt(perPage) || 10;

      const totalCount = await prisma.user.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const skip = (pageNumber - 1) * itemsPerPage;
      const take = itemsPerPage;

      const users = await prisma.user.findMany({
        skip,
        take,
        orderBy: {
          name: "asc",
        },
        include: {
          city: {
            select: {
              name: true,
              cnes: true,
            },
          },
        },
      });

      res.json({
        total: totalCount,
        total_pages: totalPages,
        users,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, cpf, password, role, cityId, cbo, cns, phone } = req.body;
      const hashedPassword = await hashText(password);
      const user = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name,
          cpf,
          password: hashedPassword,
          role,
          cityId,
          cbo,
          cns,
          phone,
        },
      });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
