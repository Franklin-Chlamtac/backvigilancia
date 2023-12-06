import jwt from "jsonwebtoken";
import userService from "../services/user-service";

export default {
  async login(req, res) {
    try {
      const { cpf, password } = req.body;

      const user = await userService.login(cpf, password);

      if (user.error) {
        return res.status(401).json({ error: user.error });
      }

      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      if (!cpf) {
        return res.status(401).json({ message: "E-mail incorreto" });
      }

      if (!password) {
        return res.status(401).json({ message: "Senha incorreta" });
      }
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao fazer login" });
    }
  },
};
