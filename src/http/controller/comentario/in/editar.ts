import { z } from "zod";
import type { Request, Response } from "express";
import { fabricaEditarComentario } from "../../../../use-cases/comentariosUseCases/factory/fabricaEditar-comentario";

export async function editar(request: Request, response: Response) {
    try {
        if (!request.usuario?.id)
            return response.status(401).json({ mensagem: "Usuário não autenticado" });

        const editarComentarioParams = z.object({ postagemID: z.coerce.number().positive(), comentarioID: z.coerce.number().positive(), });

        const editarComentarioBody = z.object({ conteudo: z.string().min(2).max(1000) });

        const resultadoParams = editarComentarioParams.safeParse(request.params);
        const resultadoBody = editarComentarioBody.safeParse(request.body);

        if (!resultadoParams.success)
            return response.status(400).json({ mensagem: "Erro de validação dos parâmetros", erros: resultadoParams.error.format() });

        if (!resultadoBody.success)
            return response.status(400).json({ mensagem: "Erro de validação do corpo", erros: resultadoBody.error.format() });

        const fbrEditarComentario = await fabricaEditarComentario();

        const resultadoProcessado = await fbrEditarComentario.processar(
            resultadoParams.data.postagemID,
            resultadoParams.data.comentarioID,
            resultadoBody.data.conteudo
        );

        if (!resultadoProcessado)
            return response.status(404).json({ mensagem: "Comentário não encontrado" });

        return response.status(200).json(resultadoProcessado);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: "Erro ao editar comentário" });
    }
}
