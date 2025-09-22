import express from 'express';
import dotenv from "dotenv";

dotenv.config();

export const app = express();
app.use(express.json());
app.listen(process.env.API_PORT, () => console.log('Servidor rodando na porta 3000'));