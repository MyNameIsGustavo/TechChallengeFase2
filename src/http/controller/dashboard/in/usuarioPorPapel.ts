import type { Request, Response } from 'express';
import { fabricaUsuarioPorPapel } from '../../../../use-cases/dashboardUseCases/factory/fabricaUsuarioPorPapel';

export async function usuarioPorPapel(request: Request, response: Response) {

    try {
        const objFabricaUsuarioPorPapel = await fabricaUsuarioPorPapel();
        const resultadoProcessado = await objFabricaUsuarioPorPapel.processar();
        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a busca de todos papeis de usuários: ${error}`);
    }
}