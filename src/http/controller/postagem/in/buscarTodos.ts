import type { Request, Response } from 'express';
import { PostagemRepository } from '../../../../repositories/pg/postagem.repository';

export async function buscarTodos(request: Request, response: Response) {

    try {
        const objPostagemRepository = new PostagemRepository();
        const resultadoProcessado = await objPostagemRepository.buscarTodasPostagens();

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a busca de todas postagens: ${error}`);
    }
}