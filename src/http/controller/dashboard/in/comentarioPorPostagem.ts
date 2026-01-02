import type { Request, Response } from 'express';
import { fabricaComentarioPorPostagem } from '../../../../use-cases/dashboardUseCases/factory/fabricaComentarioPorPostagem';

export async function comentarioPorPostagem(request: Request, response: Response) {
    try {
        const objFabricaComentarioPorPostagem = await fabricaComentarioPorPostagem();
        const resultadoProcessado = await objFabricaComentarioPorPostagem.processar();
        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a busca comentario por postagem: ${error}`);
    }
}