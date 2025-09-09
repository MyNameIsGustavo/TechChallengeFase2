import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from './in/deletar';
import { buscarPorID } from './in/buscarPorID';
import { buscarTodos } from './in/buscarTodos';

export async function postagemRotas(app: Application) {
    app.post('/postagem', criar);
    app.delete('/postagem/:id', deletar);
    app.get('/postagem/:id', buscarPorID);
    app.get('/postagem', buscarTodos);
}