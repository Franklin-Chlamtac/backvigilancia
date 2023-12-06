import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ResponseMessages } from "../utils/response-messages";
import { decode } from "../libs/token";
import express from "express";

const protectedRoutes = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: ResponseMessages.UNAUTHENTICATED });
  }
  try {
    const payload = decode(token);
    req.user = payload;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res
        .status(401)
        .json({ message: ResponseMessages.SESSION_EXPIRED });
    }

    if (error instanceof JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: ResponseMessages.SESSION_INVALID });
    }

    throw error;
  }

};

export default protectedRoutes;
