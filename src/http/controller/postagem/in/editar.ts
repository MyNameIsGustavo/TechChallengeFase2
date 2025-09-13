import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaDeletarPostagem } from '../../../../use-cases/postagemUseCases/factory/fabricaEditar-postagem';

export async function editar(request: Request, response: Response) {

    try {
        const fbrEditarPapelUsuario = await fabricaDeletarPostagem();

        const editarPapelSchemaParametro = z.object({ id: z.coerce.number().int().positive() });
        const editarPapelSchemaBody = z.object({
            titulo: z.string().max(250),
            descricao: z.string().max(500),
            caminhoImagem: z.string().max(500),
            visibilidade: z.boolean(),
        });

        const resultadoValidacaoSchemaParametro = editarPapelSchemaParametro.safeParse(request.params);
        if (!resultadoValidacaoSchemaParametro.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchemaParametro.error,
            });
        }

        const resultadoValidacaoSchemaBody = editarPapelSchemaBody.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchemaBody.error,
            });
        }

        const { id } = resultadoValidacaoSchemaParametro.data;

        const resultadoProcessado = await fbrEditarPapelUsuario.processar(id, resultadoValidacaoSchemaBody.data);
        if (!resultadoProcessado) {
            return response.status(404).json({ mensagem: 'Postagem não encontrada' });
        }

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a edição de postagem: ${error}`);
    }
}