import { z } from "zod";
import type { Request, Response } from "express";
import { fabricaDeletaComentario } from "../../../../use-cases/comentariosUseCases/factory/fabricaDeleta-comentario";

export async function deletar(request: Request, response: Response) {
    try {
        if (!request.usuario?.id) return response.status(401).json({ mensagem: "Usuário não autenticado" });

        const deletarComentario = z.object({
            postagemID: z.number().positive(),
            comentarioID: z.number().positive(),
        });

        const resultado = deletarComentario.safeParse(request.body);

        if (!resultado.success) return response.status(400).json({ mensagem: "Erro de validação", erros: resultado.error.format() });

        const fabricaDeletarComentario = await fabricaDeletaComentario();
        const resultadoProcessado = await fabricaDeletarComentario.processar(
            resultado.data.postagemID,
            resultado.data.comentarioID
        );

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            mensagem: "Erro ao processar a criação de nova postagem",
        });
    }
}