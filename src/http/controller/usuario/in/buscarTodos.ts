import type { Request, Response } from 'express';
import { fabricaBuscarTodosUsuarios } from '../../../../use-cases/usuarioUseCases/factory/fabricaBuscarTodos-usuario';

export async function buscarTodos(request: Request, response: Response) {
    try {
        const { pagina, limite, tipoUsuario } = request.query;

        const useCase = await fabricaBuscarTodosUsuarios();

        const resultado = await useCase.processar(
            pagina ? Number(pagina) : 1,
            limite ? Number(limite) : 10,
            tipoUsuario ? Number(tipoUsuario) : undefined
        );

        return response.status(200).json(resultado);
    } catch (error) {
        return response
            .status(500)
            .json({ erro: `Erro ao processar a busca de usuários` });
    }
}