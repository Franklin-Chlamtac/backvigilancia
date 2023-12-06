const permissionMiddleware = (req, res, next) => {
  if (req.user.role === "ADMIN") {
    next();
  } else {
    return res
      .status(403)
      .json({
        message: "Acesso negado. Você não possui permissão de administrador.",
      });
  }
};

export default permissionMiddleware;
