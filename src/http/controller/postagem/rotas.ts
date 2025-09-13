import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from './in/deletar';
import { buscarPorID } from './in/buscarPorID';
import { buscarTodos } from './in/buscarTodos';
import { editar } from './in/editar';
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';

export async function postagemRotas(app: Application) {
    app.post('/postagem', autenticacaoMiddleware, criar);
    app.delete('/postagem/:id', autenticacaoMiddleware, deletar);
    app.get('/postagem/:id', autenticacaoMiddleware, buscarPorID);
    app.get('/postagem', autenticacaoMiddleware, buscarTodos);
    app.put("/postagem/:id", autenticacaoMiddleware, editar);
}