import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaCriaPapelUsuario } from '../../../../use-cases/papelUsuarioUseCases/factory/fabricaCria-papelUsuario';

export async function criar(request: Request, response: Response) {

    try {
        const criarPapelSchema = z.object({ papel: z.string().min(3).max(50) });

        const resultadoValidacaoSchema = criarPapelSchema.safeParse(request.body);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const objFabricaCriaPapelUsuario = await fabricaCriaPapelUsuario();
        const { papel } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaCriaPapelUsuario.processar(papel);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a criação de novo papel: ${error}`);
    }
}