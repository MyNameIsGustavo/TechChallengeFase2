import express from "express";
import dotenv from "dotenv";
import { bancoDeDados } from "./lib/pg/db";

dotenv.config();

export const app = express();
const PORT = process.env.API_PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

bancoDeDados.getClient();