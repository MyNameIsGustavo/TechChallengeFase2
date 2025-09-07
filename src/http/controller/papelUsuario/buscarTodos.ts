import type { Request, Response } from 'express';
import { PapelUsuarioRepository } from '../../../repositories/pg/papelUsuario.repository';

export async function buscarTodos(request: Request, response: Response) {

    try {
        const objPapelUsuarioRepository = new PapelUsuarioRepository();
        const resultadoProcessado = await objPapelUsuarioRepository.buscarTodosPapeisUsuarios();

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a busca de todos papeis de usuários: ${error}`);
    }
}