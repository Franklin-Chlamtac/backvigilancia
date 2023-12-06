import { prisma } from "../libs/prisma";

export default {
  async handler({ id }) {
    return prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        cpf: true,
        role: true,
      },
    });
  },
};
