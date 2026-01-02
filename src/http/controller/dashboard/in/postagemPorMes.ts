import type { Request, Response } from 'express';
import { fabricaPostagemPorMes } from '../../../../use-cases/dashboardUseCases/factory/fabricaPostagemPorMes';

export async function postagemPorMes(request: Request, response: Response) {

    try {
        const objFabricaPostagemPorMes = await fabricaPostagemPorMes();
        const resultadoProcessado = await objFabricaPostagemPorMes.processar();
        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a busca postagem por mes: ${error}`);
    }
}