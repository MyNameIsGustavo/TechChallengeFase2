import { criar } from "./criar";
import type { Application } from 'express';
import { deletar } from "./deletar";
import { buscarPorID } from "./buscarPorID";
import { buscarTodos } from "./buscarTodos";
import { editar } from "./editar";

export async function papelUsuarioRotas(app: Application) {
    app.post('/papelUsuario', criar);
    app.delete('/papelUsuario/:id', deletar);
    app.get('/papelUsuario/:id', buscarPorID)
    app.get('/papelUsuario', buscarTodos)
    app.put('/papelUsuario/:id', editar);
}