import { z } from 'zod';
import type { Request, Response } from 'express';
import { UsuarioRepository } from '../../../../repositories/pg/usuario.repository';

export async function editar(request: Request, response: Response) {
    try {
        const objUsuarioRepository = new UsuarioRepository();
        const editarUsuarioSchemaParametro = z.object({ id: z.coerce.number().int().positive() });
        const editarUsuarioSchemaBody = z.object({ 
            nomeCompleto: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres").max(100),
            telefone: z.string().min(8, "Telefone inválido").max(20),
            email: z.string().email("Email inválido"),
            papelUsuarioID: z.number().int().positive("ID do papel deve ser um número positivo"),
            senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
         });

        const resultadoValidacaoSchemaParametro = editarUsuarioSchemaParametro.safeParse(request.params);
        if (!resultadoValidacaoSchemaParametro.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchemaParametro.error,
            });
        }

        const resultadoValidacaoSchemaBody = editarUsuarioSchemaBody.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchemaBody.error,
            });
        }

        const { id } = resultadoValidacaoSchemaParametro.data;

        const resultadoProcessado = await objUsuarioRepository.editarUsuario(id, resultadoValidacaoSchemaBody.data);
        if (!resultadoProcessado) {
            return response.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a edição de usuário: ${error}`);
    }
}