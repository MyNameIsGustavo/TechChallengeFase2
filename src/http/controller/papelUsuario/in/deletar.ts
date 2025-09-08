import { z } from 'zod';
import type { Request, Response } from 'express';
import { PapelUsuarioRepository } from '../../../../repositories/pg/papelUsuario.repository';

export async function deletar(request: Request, response: Response) {

    try {
        const deletarPapelSchema = z.object({ id: z.coerce.number().int().positive() });

        const objPapelUsuarioRepository = new PapelUsuarioRepository();

        const resultadoValidacaoSchema = deletarPapelSchema.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objPapelUsuarioRepository.deletarPapelUsuario(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a deleção de papel usuário: ${error}`);
    }
}