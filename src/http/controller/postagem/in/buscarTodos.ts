import type { Request, Response } from 'express';
import { fabricaBuscarTodosPostagem } from '../../../../use-cases/postagemUseCases/factory/fabricaBuscarTodos-postagem';

export async function buscarTodos(request: Request, response: Response) {

    try {
        const objFabricaBuscarTodosPostagem = await fabricaBuscarTodosPostagem();
        const resultadoProcessado = await objFabricaBuscarTodosPostagem.processar();

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a busca de todas postagens: ${error}`);
    }
}