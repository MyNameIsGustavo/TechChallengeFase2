import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaBuscarPorPostagemPorPalavraChave } from '../../../../use-cases/postagemUseCases/factory/buscarPorChave-postagem';

export async function buscarPorPalavraChave(request: Request, response: Response) {

    try {
        const buscarPostagemSchema = z.object({ palavra: z.string().min(3) });
        const objFabricaBuscarPostagemPorChave = await fabricaBuscarPorPostagemPorPalavraChave();

        const resultadoValidacaoSchema = buscarPostagemSchema.safeParse(request.query);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'String deve ter no mínimo 3 caracteres',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { palavra } = resultadoValidacaoSchema.data;
        console.log(palavra)
        const resultadoProcessado = await objFabricaBuscarPostagemPorChave.processar(palavra);
        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar postagem por palavra chave: ${error}`);
    }
}