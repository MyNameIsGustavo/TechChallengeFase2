import { z } from 'zod';
import type { Request, Response } from 'express';
import { PostagemRepository } from '../../../../repositories/pg/postagem.repository';

export async function buscarPorID(request: Request, response: Response) {

    try {
        const buscarPostagemSchema = z.object({ id: z.coerce.number().int().positive() });

        const objPostagemRepository = new PostagemRepository();

        const resultadoValidacaoSchema = buscarPostagemSchema.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objPostagemRepository.buscarPostagemPorID(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por ID da postagem: ${error}`);
    }
}