import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaCriarUsuarios } from '../../../../use-cases/usuarioUseCases/factory/fabricaCria-usuario';

export async function criar(request: Request, response: Response) {
    try {
        const usuarioSchema = z.object({
            nomeCompleto: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres").max(100),
            telefone: z.string().min(8, "Telefone inválido").max(20),
            email: z.string().email("Email inválido"),
            papelUsuarioID: z.number().int().positive("ID do papel deve ser um número positivo"),
            senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
        });

        const objFabricaCriarUsuarios = await fabricaCriarUsuarios();

        const resultadoValidacaoSchema = usuarioSchema.safeParse(request.body);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const novoUsuario = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaCriarUsuarios.processar(novoUsuario);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a criação de novo usuario: ${error}`);
    }
}