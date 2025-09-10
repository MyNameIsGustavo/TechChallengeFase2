import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaBuscarPorIDPapelUsuario } from '../../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarPorID-papelUsuario';

export async function buscarPorID(request: Request, response: Response) {

    try {
        const buscarPapelSchema = z.object({ id: z.coerce.number().int().positive() });

        const objFabricaBuscarPorIDPapelUsuario = await fabricaBuscarPorIDPapelUsuario();

        const resultadoValidacaoSchema = buscarPapelSchema.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaBuscarPorIDPapelUsuario.processar(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por ID do papel de usuário: ${error}`);
    }
}