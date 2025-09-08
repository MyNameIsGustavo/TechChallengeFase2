import { z } from 'zod';
import type { Request, Response } from 'express';
import { UsuarioRepository } from '../../../../repositories/pg/usuario.repository';

export async function buscarPorID(request: Request, response: Response) {

    try {
        const buscarUsuarioSchema = z.object({ id: z.coerce.number().int().positive() });

        const objUsuarioRepository = new UsuarioRepository();

        const resultadoValidacaoSchema = buscarUsuarioSchema.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objUsuarioRepository.buscarUsuarioPorID(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por ID do usuário: ${error}`);
    }
}