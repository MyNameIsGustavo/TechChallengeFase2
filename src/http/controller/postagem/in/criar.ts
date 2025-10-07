import { z } from "zod";
import type { Request, Response } from "express";
import { fabricaCriarPostagem } from "../../../../use-cases/postagemUseCases/factory/fabricaCria-postagem";
import { uploadImagem } from "../../../../use-cases/postagemUseCases/uploadImgBB-postagem";
import dotenv from "dotenv";
import fs from "fs";

const envFile = process.env.NODE_ENV === "PRODUCTION" ? ".env.prod" : ".env.local";
dotenv.config({ path: envFile });

export async function criar(request: Request, response: Response) {
  try {
    const criarPostagemSchema = z.object({
      caminhoImagem: z.string().max(500).optional(),
      titulo: z.string().min(1, "Título é obrigatório").max(250),
      descricao: z.string().max(500),
      visibilidade: z
        .union([z.boolean(), z.string()])
        .transform((val) => val === "true" || val === true),
      autorID: z
        .union([z.number(), z.string()])
        .transform((val) => Number(val)),
    });

    const resultadoValidacaoSchema = criarPostagemSchema.safeParse(request.body);

    if (!resultadoValidacaoSchema.success) {
      return response.status(400).json({
        mensagem: "Erro de validação",
        erros: resultadoValidacaoSchema.error.format(),
      });
    }

    const objFabricaCriarPostagem = await fabricaCriarPostagem();

    const novaPostagem = {
      ...resultadoValidacaoSchema.data,
      dataPublicacao: new Date(),
      caminhoImagem: "",
    };

    const resultadoProcessado = await objFabricaCriarPostagem.processar(novaPostagem, request.file);

    return response.status(201).json(resultadoProcessado);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      mensagem: `Erro ao processar a criação de nova postagem: ${error}`,
    });
  }
}