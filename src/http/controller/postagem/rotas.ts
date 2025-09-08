import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from './in/deletar';

export async function postagemRotas(app: Application) {
    app.post('/postagem', criar);
    app.delete('/postagem', deletar);
}