import app from "./app";
import "dotenv/config";

// app.get('/users', async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Erro ao buscar usuários.' });
//   }
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// a
