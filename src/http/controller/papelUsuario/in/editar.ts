import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaEditarPapelUsuario } from '../../../../use-cases/papelUsuarioUseCases/factory/fabricaEditar-papelUsuario';

export async function editar(request: Request, response: Response) {

    try {
        const objFabricaEditarPapelUsuario = await fabricaEditarPapelUsuario();
        const editarPapelSchemaParametro = z.object({ id: z.coerce.number().int().positive() });
        const editarPapelSchemaBody = z.object({ papel: z.string().min(3).max(50) });

        const resultadoValidacaoSchemaParametro = editarPapelSchemaParametro.safeParse(request.params);
        if (!resultadoValidacaoSchemaParametro.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchemaParametro.error,
            });
        }

        const resultadoValidacaoSchemaBody = editarPapelSchemaBody.safeParse(request.body);
        if (!resultadoValidacaoSchemaBody.success) {
            return response.status(400).json({
                mensagem: 'Erro de validação',
                erros: resultadoValidacaoSchemaBody.error,
            });
        }

        const { id } = resultadoValidacaoSchemaParametro.data;
        const { papel } = resultadoValidacaoSchemaBody.data;

        const resultadoProcessado = await objFabricaEditarPapelUsuario.processar(id, papel);
        if (!resultadoProcessado) {
            return response.status(404).json({ mensagem: 'Papel de usuário não encontrado' });
        }

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a deleção de papel usuário: ${error}`);
    }
}