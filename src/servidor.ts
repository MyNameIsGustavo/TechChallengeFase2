import express from 'express';
import dotenv from "dotenv";

dotenv.config();

export const app = express();
app.use(express.json());

const PORT = Number(process.env.API_PORT_DEV) || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});