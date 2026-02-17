import type { Request, Response } from 'express';
import { fabricaBuscarTodosUsuarios } from '../../../../use-cases/usuarioUseCases/factory/fabricaBuscarTodos-usuario';

export async function buscarTodos(request: Request, response: Response) {
    try {
        const { pagina = 1, limite = 10, tipoUsuario } = request.query;

        const useCase = await fabricaBuscarTodosUsuarios();

        const resultado = await useCase.processar(
            Number(pagina),
            Number(limite),
            tipoUsuario ? Number(tipoUsuario) : undefined
        );

        return response.status(200).json(resultado);
    } catch {
        return response.status(500).json({
            erro: "Erro ao processar a busca de usuários"
        });
    }
}