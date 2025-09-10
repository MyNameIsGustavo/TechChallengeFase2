import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaDeletarUsuarios } from '../../../../use-cases/usuarioUseCases/factory/fabricaDeleta-usuario';

export async function deletar(request: Request, response: Response) {

    try {
        const deletarUsuarioSchema = z.object({ id: z.coerce.number().int().positive() });

        const objFabricaDeletarUsuarios = await fabricaDeletarUsuarios();

        const resultadoValidacaoSchema = deletarUsuarioSchema.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaDeletarUsuarios.processar(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a deleção de usuário: ${error}`);
    }
}