import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaAlterarUsuario } from "../../../../use-cases/usuarioUseCases/factory/fabricaAlterar-usuario";

export async function alterar(request: Request, response: Response) {
    try {
        if (!request.usuario?.id) return response.status(401).json({ mensagem: "Usuário não autenticado" });

        const fbrAlterarUsuario = await fabricaAlterarUsuario();
        const editarUsuarioSchemaBody = z.object({
            nomeCompleto: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres").max(100),
            telefone: z.string().min(8, "Telefone inválido").max(20),
            senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").optional(),
        });

        const resultadoValidacaoSchemaBody = editarUsuarioSchemaBody.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchemaBody.error,
            });
        }

        const id = request.usuario?.id;

        const resultadoProcessado = await fbrAlterarUsuario.processar(id, resultadoValidacaoSchemaBody.data, request.file);
        if (!resultadoProcessado) {
            return response.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a edição de usuário: ${error}`);
    }
}