import type { Request, Response } from 'express';
import { fabricaCurtidasPorPostagem } from '../../../../use-cases/dashboardUseCases/factory/fabricaCurtidaPorPostagem';

export async function curtidaPorPostagem(request: Request, response: Response) {
    try {
        const objFabricaCurtidaPorPostagem = await fabricaCurtidasPorPostagem();
        const resultadoProcessado = await objFabricaCurtidaPorPostagem.processar();
        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a busca curtida por postagem: ${error}`);
    }
}