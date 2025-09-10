import type { Request, Response } from 'express';
import { fabricaBuscarTodosUsuarios } from '../../../../use-cases/usuarioUseCases/factory/fabricaBuscarTodos-usuario';

export async function buscarTodos(request: Request, response: Response) {
    try {
        const objFabricaBuscarTodosUsuarios = await fabricaBuscarTodosUsuarios();
        const resultadoProcessado = await objFabricaBuscarTodosUsuarios.processar();

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a busca de todos usuários: ${error}`);
    }
}