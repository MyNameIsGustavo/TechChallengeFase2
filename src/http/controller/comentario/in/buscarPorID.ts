import { fabricaBuscarComentarioPorID } from "../../../../use-cases/comentariosUseCases/factory/fabricaBuscarPorID-comentario";
import type { Request, Response } from "express";
import { z } from "zod";

export async function buscarPorID(request: Request, response: Response) {
    try {
        if (!request.usuario?.id)
            return response.status(401).json({ mensagem: "Usuário não autenticado" });

        const schemaParams = z.object({
            postagemID: z.coerce.number().positive(),
            comentarioID: z.coerce.number().positive()
        });

        const resultadoValidacao = schemaParams.safeParse(request.params);
        if (!resultadoValidacao.success) {
            return response.status(400).json({
                mensagem: "Erro de validação",
                erros: resultadoValidacao.error.format(),
            });
        }

        const { postagemID, comentarioID } = resultadoValidacao.data;

        const buscarComentarioPorID = await fabricaBuscarComentarioPorID();
        const resultadoProcessado = await buscarComentarioPorID.processar(postagemID, comentarioID);

        if (!resultadoProcessado) {
            return response.status(404).json({ mensagem: "Comentário não encontrado" });
        }

        return response.status(200).json(resultadoProcessado);
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            mensagem: "Erro ao buscar comentário",
        });
    }
}
