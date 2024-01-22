import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import userRoutes from "./routes/user-route.js";

import cityRoutes from "./routes/city-route.js";

import loginRoutes from "./routes/auth-route.js";

import sessionRoutes from "./routes/get-session.js";

import responsibleRoutes from "./routes/responsible-route.js";

import establishmentRoutes from "./routes/establishment-route.js";

import professionalRoutes from "./routes/professionals-route.js";

import procedureRoutes from "./routes/procedure-route.js";

import complaintRoutes from "./routes/complaint-route.js";

import productionRoutes from "./routes/production-route.js";

import occupationRoutes from "./routes/occupations-route.js";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/cities", cityRoutes);
app.use("/responsibles", responsibleRoutes);
app.use("/establishments", establishmentRoutes);
app.use("/professionals", professionalRoutes);
app.use("/procedures", procedureRoutes);
app.use("/complaints", complaintRoutes);
app.use("/productions", productionRoutes);
app.use("/occupations", occupationRoutes);

// app.use('/auth', authRoutes);

export default app;
