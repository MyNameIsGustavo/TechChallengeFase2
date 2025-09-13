import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from "./in/deletar";
import { buscarPorID } from "./in/buscarPorID";
import { buscarTodos } from "./in/buscarTodos";
import { editar } from "./in/editar";
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';

export async function papelUsuarioRotas(app: Application) {
    app.post('/papelUsuario', autenticacaoMiddleware, criar);
    app.delete('/papelUsuario/:id', autenticacaoMiddleware, deletar);
    app.get('/papelUsuario/:id', autenticacaoMiddleware, buscarPorID)
    app.get('/papelUsuario', autenticacaoMiddleware, buscarTodos)
    app.put('/papelUsuario/:id', autenticacaoMiddleware, editar);
}