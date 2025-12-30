import { z } from "zod";
import type { Request, Response } from "express";
import { fabricaDeletaComentario } from "../../../../use-cases/comentariosUseCases/factory/fabricaDeleta-comentario";

export async function deletar(request: Request, response: Response) {
    try {
        if (!request.usuario?.id) {
            return response.status(401).json({ mensagem: "Usuário não autenticado" });
        }

        const schema = z.object({
            postagemID: z.coerce.number().positive(),
            comentarioID: z.coerce.number().positive(),
        });

        const resultado = schema.safeParse(request.params);

        if (!resultado.success) {
            return response.status(400).json({
                mensagem: "Erro de validação",
                erros: resultado.error.format(),
            });
        }

        const useCase = await fabricaDeletaComentario();
        const comentarioDeletado = await useCase.processar(
            resultado.data.postagemID,
            resultado.data.comentarioID,
        );

        return response.status(201).send(comentarioDeletado);
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            mensagem: "Erro ao deletar comentário",
        });
    }
}
