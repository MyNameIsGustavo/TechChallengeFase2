import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from "./in/deletar";
import { buscarTodos } from './in/buscarTodos';
import { buscarPorID } from './in/buscarPorID';
import { editar } from '../papelUsuario/in/editar';
import { login } from './in/login';

export async function usuarioRotas(app: Application) {
    app.post("/login", login);
    app.post('/usuarios', criar);
    app.get('/usuarios', buscarTodos);
    app.get('/usuarios/:id', buscarPorID);
    app.put("/usuarios/:id", editar);
    app.delete('/usuarios/:id', deletar);
}