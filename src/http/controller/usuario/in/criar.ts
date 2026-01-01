import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaCriarUsuarios } from '../../../../use-cases/usuarioUseCases/factory/fabricaCria-usuario';

export async function criar(request: Request, response: Response) {
    try {
        const usuarioSchema = z.object({
            nomeCompleto: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres").max(100),
            telefone: z.string().min(8, "Telefone inválido").max(20),
            email: z.string().email("Email inválido"),
            papelUsuarioID: z.coerce.number().int().positive("ID do papel deve ser um número positivo"),
            senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
            caminhoImagem: z.any().optional(),
        });

        const resultadoValidacaoSchema = usuarioSchema.safeParse({
            ...request.body,
            caminhoImagem: "",
        });

        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const objFabricaCriarUsuarios = await fabricaCriarUsuarios();
        const novoUsuarioComImagem = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaCriarUsuarios.processar(novoUsuarioComImagem, request.file);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: `Erro ao processar a criação de usuário: ${error}` });
    }
}
