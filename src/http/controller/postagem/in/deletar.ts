import { z } from 'zod';
import type { Request, Response } from 'express';
import { PostagemRepository } from '../../../../repositories/pg/postagem.repository';

export async function deletar(request: Request, response: Response) {

    try {
        const deletarPostagemSchema = z.object({ id: z.coerce.number().int().positive() });

        const objPostagemRepository = new PostagemRepository();

        const resultadoValidacaoSchema = deletarPostagemSchema.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objPostagemRepository.deletarPostagem(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a deleção de postagem: ${error}`);
    }
}