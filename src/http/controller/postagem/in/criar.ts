import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaCriarPostagem } from '../../../../use-cases/postagemUseCases/factory/fabricaCria-postagem';

export async function criar(request: Request, response: Response) {
    try {
        const criarPostagemSchema = z.object({
            caminhoImagem: z.string().max(500),
            titulo: z.string().max(250),
            descricao: z.string().max(500),
            visibilidade: z.boolean(),
            autorID: z.number().positive(),
        });

        const objFabricaCriarPostagem = await fabricaCriarPostagem();

        const resultadoValidacaoSchema = criarPostagemSchema.safeParse(request.body);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const novaPostagem = { dataPublicacao: new Date(), ...resultadoValidacaoSchema.data }
        const resultadoProcessado = await objFabricaCriarPostagem.processar(novaPostagem);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a criação de nova postagem: ${error}`);
    }
}