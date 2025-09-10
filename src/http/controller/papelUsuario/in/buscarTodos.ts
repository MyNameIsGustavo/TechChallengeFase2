import type { Request, Response } from 'express';
import { fabricaBuscarTodosPapelUsuario } from '../../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarTodos-papelUsuario';

export async function buscarTodos(request: Request, response: Response) {

    try {
        const objFabricaBuscarTodosPapelUsuario = await fabricaBuscarTodosPapelUsuario();
        const resultadoProcessado = await objFabricaBuscarTodosPapelUsuario.processar();

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a busca de todos papeis de usuários: ${error}`);
    }
}