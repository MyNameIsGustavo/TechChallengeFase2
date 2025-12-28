import type { Application } from 'express';
import { criar } from "./in/criar";
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';
import { autorizacaoMiddleware } from '../../../middleware/autorizacao-middleware';
import { PapeisUsuario } from '../../../enums/papeisUsuarios';
import { deletar } from './in/deletar';

export async function curtidasRotas(app: Application) {

    /**
     * @openapi
     * /curtida:
     *   post:
     *     summary: Cadastra uma nova curtida
     *     description: Cria uma curtida com o ID da postagem e o ID do usuário.
     *     tags:
     *       - Curtidas
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
     *     responses:
     *       200:
     *         description: Curtida cadastrada com sucesso.
     *       400:
     *         description: Erro de validação.
     */
    app.post('/curtida', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.ESTUDANTE, PapeisUsuario.SUPORTE), criar);


    /**
     * @openapi
     * /curtida:
     *   delete:
     *     summary: Remove uma curtida existente
     *     description: Remove uma curtida com o ID da postagem e o ID do usuário.
     *     tags:
     *       - Curtidas
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
     *     responses:
     *       200:
     *         description: Curtida removida com sucesso.
     *       400:
     *         description: Erro de validação.
     */
    app.delete('/curtida', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.ESTUDANTE, PapeisUsuario.SUPORTE), deletar);
}