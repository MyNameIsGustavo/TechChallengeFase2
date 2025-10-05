import { z } from "zod";
import type { Request, Response } from "express";
import { fabricaCriarPostagem } from "../../../../use-cases/postagemUseCases/factory/fabricaCria-postagem";
import { uploadParaImgbb } from "../../../../use-cases/postagemUseCases/uploadImgBB-postagem";
import dotenv from "dotenv";
import fs from "fs";

const envFile = process.env.NODE_ENV === "PRODUCTION" ? ".env.prod" : ".env.local";
dotenv.config({ path: envFile });

export async function criar(request: Request, response: Response) {
  try {
    const criarPostagemSchema = z.object({
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

    let caminhoImagem = "";

    if (request.file) {
      if (process.env.NODE_ENV === "DEVELOPMENT") {
        caminhoImagem = request.file.path;
      } else {
        caminhoImagem = await uploadParaImgbb(request.file.path);
        fs.unlinkSync(request.file.path);
      }
    }

    const dadosParaValidacao = {
      ...request.body,
      caminhoImagem,
    };

    const resultadoValidacaoSchema = criarPostagemSchema.safeParse(dadosParaValidacao);

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
      caminhoImagem: caminhoImagem || "",
    };

    const resultadoProcessado = await objFabricaCriarPostagem.processar(novaPostagem);

    return response.status(201).json(resultadoProcessado);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      mensagem: `Erro ao processar a criação de nova postagem: ${error}`,
    });
  }
}