import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaBuscarPorIDUsuario } from '../../../../use-cases/usuarioUseCases/factory/fabricaBuscarPorID-usuario';

export async function buscarInformacoes(request: Request, response: Response) {

    try {
        const usuarioId = (request as any).usuario.id;
        
        console.log(usuarioId);

        const objFabricaBuscarPorIDUsuario = await fabricaBuscarPorIDUsuario();

        const resultadoProcessado = await objFabricaBuscarPorIDUsuario.processar(usuarioId);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por ID do usuário: ${error}`);
    }
}