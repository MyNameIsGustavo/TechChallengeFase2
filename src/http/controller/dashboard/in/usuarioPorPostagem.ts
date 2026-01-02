import type { Request, Response } from 'express';
import { fabricaUsuarioPorPostagem } from '../../../../use-cases/dashboardUseCases/factory/fabricaUsuarioPorPostagem';

export async function usuarioPorPostagem(request: Request, response: Response) {
    try {
        const objFabricaUsuarioPorPostagem = await fabricaUsuarioPorPostagem();
        const resultadoProcessado = await objFabricaUsuarioPorPostagem.processar();
        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a busca de usuarios por postagem: ${error}`);
    }
}