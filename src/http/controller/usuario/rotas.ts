import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from "./in/deletar";
import { buscarTodos } from './in/buscarTodos';
import { buscarPorID } from './in/buscarPorID';
import { editar } from '../papelUsuario/in/editar';
import { login } from './in/login';
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';

export async function usuarioRotas(app: Application) {
    app.post("/login", login);
    app.post('/usuarios', autenticacaoMiddleware, criar);
    app.get('/usuarios', autenticacaoMiddleware, buscarTodos);
    app.get('/usuarios/:id', autenticacaoMiddleware, buscarPorID);
    app.put("/usuarios/:id", autenticacaoMiddleware, editar);
    app.delete('/usuarios/:id', autenticacaoMiddleware, deletar);
}