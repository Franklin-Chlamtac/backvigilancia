import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { encode } from "../libs/token";

const prisma = new PrismaClient();

const userService = {
  async login(cpf, password) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          cpf,
        },
      });

      if (!user) {
        return { error: "Usuário não encontrado" };
      }

      // Compara a senha fornecida com a senha armazenada no banco de dados
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return { error: "Senha incorreta" };
      }

      // Gera um token JWT
      // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      //   expiresIn: "1h",
      // });
      const token = encode({ id: user.id });

      // Retorna o usuário e o token JWT
      return { user, token };
    } catch (error) {
      return { error: "Erro ao fazer login" };
    }
  },
};

export default userService;
