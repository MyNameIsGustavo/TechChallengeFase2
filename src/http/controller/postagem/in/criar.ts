import { z } from "zod";
import type { Request, Response } from "express";
import { fabricaCriarPostagem } from "../../../../use-cases/postagemUseCases/factory/fabricaCria-postagem";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "PRODUCTION" ? ".env.prod" : ".env.local";
dotenv.config({ path: envFile });

export async function criar(request: Request, response: Response) {
  try {
    if (!request.usuario?.id) {
      return response.status(401).json({ mensagem: "Usuário não autenticado" });
    }

    const criarPostagemSchema = z.object({
      titulo: z.string().min(1).max(250),
      descricao: z.string().max(500),
      visibilidade: z
        .union([z.boolean(), z.string()])
        .transform((val) => val === "true" || val === true),
    });

    const resultado = criarPostagemSchema.safeParse(request.body);

    if (!resultado.success) {
      return response.status(400).json({
        mensagem: "Erro de validação",
        erros: resultado.error.format(),
      });
    }

    const novaPostagem = {
      ...resultado.data,
      autorID: request.usuario.id,
      caminhoImagem: request.file?.path ?? "",
      dataPublicacao: new Date(),
    };

    const criarPostagemUseCase = await fabricaCriarPostagem();
    const resultadoProcessado = await criarPostagemUseCase.processar(
      novaPostagem,
      request.file
    );

    return response.status(201).json(resultadoProcessado);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      mensagem: "Erro ao processar a criação de nova postagem",
    });
  }
}