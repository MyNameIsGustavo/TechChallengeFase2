import express from 'express';
import { bancoDeDados } from './lib/pg/db';
import { papelUsuarioRotas } from './http/controller/papelUsuario/rotas';

const app = express();
app.use(express.json());

async function main() {
    await bancoDeDados.conectar();
    papelUsuarioRotas(app);

    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
}

main().catch(err => console.error(err));