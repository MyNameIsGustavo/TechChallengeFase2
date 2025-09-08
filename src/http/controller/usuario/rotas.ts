import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from "./in/deletar";
import { buscarTodos } from './in/buscarTodos';
import { buscarPorID } from './in/buscarPorID';

export async function usuarioRotas(app: Application) {
    app.post('/usuario', criar);
    app.delete('/usuario', deletar);
    app.get('/usuarios', buscarTodos);
    app.get('/usuario/:id', buscarPorID);
}