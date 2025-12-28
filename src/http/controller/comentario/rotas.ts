import type { Application } from 'express';
import { criar } from "./in/criar";
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';
import { autorizacaoMiddleware } from '../../../middleware/autorizacao-middleware';
import { PapeisUsuario } from '../../../enums/papeisUsuarios';
import { deletar } from './in/deletar';

export async function comentarioRotas(app: Application) {

    /**
     * @openapi
     * /comentario:
     *   post:
     *     summary: Cadastra um novo comentario
     *     description: Cria um comentario com o ID da postagem e o ID do usuário.
     *     tags:
     *       - Comentarios
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               postagemID:
     *                 type: integer
     *                 example: 1
     *              conteudo:
     *                type: string
     *                example: "Este é um comentário."
     *              usuarioID:
     *                type: integer
     *                example: 2
     *     responses:
     *       200:
     *         description: Comentário cadastrado com sucesso.
     *       400:
     *         description: Erro de validação.
     */
    app.post('/comentario',
        autenticacaoMiddleware,
        autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.ESTUDANTE, PapeisUsuario.SUPORTE),
        criar);

    /**
     * @openapi
     * /comentario:
     *   post:
     *     summary: Deleta um novo comentario
     *     description: deleta um comentario com o ID da postagem e o ID do comentario.
     *     tags:
     *       - Comentarios
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               postagemID:
     *                 type: integer
     *                 example: 1
     *              comentarioID:
     *                type: integer
     *                example: 2
     *     responses:
     *       200:
     *         description: Comentário deletado com sucesso.
     *       400:
     *         description: Erro de validação.
     */
    app.delete('/comentario',
        autenticacaoMiddleware,
        autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.ESTUDANTE, PapeisUsuario.SUPORTE),
        deletar);
}