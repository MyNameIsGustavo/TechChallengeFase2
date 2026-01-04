import { fabricaBuscarPorPostagemPorPalavraChave } from '../../../../use-cases/postagemUseCases/factory/fabricaBuscarPorChave-postagem';
import type { Request, Response } from 'express';
import { z } from 'zod';

export async function buscarPorPalavraChave(request: Request, response: Response) {
    try {
        if (!request.usuario?.id) return response.status(401).json({ mensagem: "Usuário não autenticado" });

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
        const resultadoProcessado = await objFabricaBuscarPostagemPorChave.processar(palavra, request.usuario.id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar postagem por palavra chave: ${error}`);
    }
}