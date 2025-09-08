import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from "./in/deletar";
import { buscarPorID } from "./in/buscarPorID";
import { buscarTodos } from "./in/buscarTodos";
import { editar } from "./in/editar";

export async function papelUsuarioRotas(app: Application) {
    app.post('/papelUsuario', criar);
    app.delete('/papelUsuario/:id', deletar);
    app.get('/papelUsuario/:id', buscarPorID)
    app.get('/papelUsuario', buscarTodos)
    app.put('/papelUsuario/:id', editar);
}