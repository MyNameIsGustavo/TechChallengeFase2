import { z } from "zod";
import type { Request, Response } from "express";
import { fabricaCriarCurtida } from "../../../../use-cases/curtidasUseCases/factory/fabricaCria-curtida";

export async function criar(request: Request, response: Response) {
    try {
        if (!request.usuario?.id) return response.status(401).json({ mensagem: "Usuário não autenticado" });

        const curtirPostagem = z.object({ postagemID: z.number().min(1) });
        const resultado = curtirPostagem.safeParse(request.body);

        if (!resultado.success) {
            return response.status(400).json({
                mensagem: "Erro de validação",
                erros: resultado.error.format(),
            });
        }

        const criarCurtida = await fabricaCriarCurtida();   
        const resultadoProcessado = await criarCurtida.processar(
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