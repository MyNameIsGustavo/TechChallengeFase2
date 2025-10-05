import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaEditarPostagem } from '../../../../use-cases/postagemUseCases/factory/fabricaEditar-postagem';
import { IPostagemModificacao } from '../../../../entities/models/postagem.interface';

export async function editar(request: Request, response: Response) {

    try {
        const fbrEditarPapelUsuario = await fabricaEditarPostagem();

        const editarPapelSchemaParametro = z.object({ id: z.coerce.number().int().positive() });
        const editarPapelSchemaBody = z.object({
            caminhoImagem: z.string().max(500).optional(),
            titulo: z.string().max(250),
            descricao: z.string().max(500),
            visibilidade: z
                .union([z.boolean(), z.string()])
                .transform((val) => val === "true" || val === true),
            autorID: z
                .union([z.number(), z.string()])
                .transform((val) => Number(val)),
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
        const dadosPostagem: IPostagemModificacao = {
            ...resultadoValidacaoSchemaBody.data,
            caminhoImagem: resultadoValidacaoSchemaBody.data.caminhoImagem || ""
        };
        const resultadoProcessado = await fbrEditarPapelUsuario.processar(id, dadosPostagem, request.file);
        if (!resultadoProcessado) {
            return response.status(404).json({ mensagem: 'Postagem não encontrada' });
        }

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a edição de postagem: ${error}`);
    }
}