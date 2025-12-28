import { z } from "zod";
import type { Request, Response } from "express";
import { fabricaDeletarCurtida } from "../../../../use-cases/curtidasUseCases/factory/fabricaDeleta-curtida";

export async function deletar(request: Request, response: Response) {
    try {
        if (!request.usuario?.id) return response.status(401).json({ mensagem: "Usuário não autenticado" });

        const descurtirPostagem = z.object({ postagemID: z.number().min(1) });
        const resultado = descurtirPostagem.safeParse(request.body);

        if (!resultado.success) {
            return response.status(400).json({
                mensagem: "Erro de validação",
                erros: resultado.error.format(),
            });
        }

        const deletarCurtida = await fabricaDeletarCurtida();
        const resultadoProcessado = await deletarCurtida.processar(
            request.usuario?.id,
            resultado.data.postagemID
        );

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            mensagem: "Erro ao processar a criação de nova postagem",
        });
    }
}