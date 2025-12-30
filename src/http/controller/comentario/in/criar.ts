import { fabricaCriarComentario } from "../../../../use-cases/comentariosUseCases/factory/fabricaCria-comentario";
import type { Request, Response } from "express";
import { z } from "zod";

export async function criar(request: Request, response: Response) {
    try {
        if (!request.usuario?.id) return response.status(401).json({ mensagem: "Usuário não autenticado" });
        const editarComentarioParams = z.object({ postagemID: z.coerce.number().positive() });
        const comentarPostagem = z.object({ conteudo: z.string().min(1).max(100).min(3), });

        const resultado = comentarPostagem.safeParse(request.body);
        const resultadoBody = editarComentarioParams.safeParse(request.params);

        if (!resultado.success) {
            return response.status(400).json({
                mensagem: "Erro de validação",
                erros: resultado.error.format(),
            });
        }
        if (!resultadoBody.success)
            return response.status(400).json({ mensagem: "Erro de validação do corpo", erros: resultadoBody.error.format() });

        const criarComentario = await fabricaCriarComentario();
        const resultadoProcessado = await criarComentario.processar(
            request.usuario?.id,
            resultadoBody.data.postagemID,
            resultado.data.conteudo
        );

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            mensagem: "Erro ao processar a criação de novo comentário",
        });
    }
}