import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaBuscarPorIDPostagem } from '../../../../use-cases/postagemUseCases/factory/fabricaBuscarPorID-postagem';

export async function buscarPorID(request: Request, response: Response) {
    try {
        if (!request.usuario?.id) return response.status(401).json({ mensagem: "Usuário não autenticado" });

        const buscarPostagemSchema = z.object({ id: z.coerce.number().int().positive() });
        const objFabricaBuscarPorIDPostagem = await fabricaBuscarPorIDPostagem();

        const resultadoValidacaoSchema = buscarPostagemSchema.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { id } = resultadoValidacaoSchema.data;
        const resultadoProcessado = await objFabricaBuscarPorIDPostagem.processar(id, request.usuario.id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por ID da postagem: ${error}`);
    }
}