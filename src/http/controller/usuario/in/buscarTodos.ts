import type { Request, Response } from 'express';
import { UsuarioRepository } from '../../../../repositories/pg/usuario.repository';

export async function buscarTodos(request: Request, response: Response) {

    try {
        const objUsuarioRepository = new UsuarioRepository();
        const resultadoProcessado = await objUsuarioRepository.buscarTodoUsuarios();

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a busca de todos usuários: ${error}`);
    }
}