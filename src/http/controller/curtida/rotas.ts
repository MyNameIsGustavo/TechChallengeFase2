import type { Application } from 'express';
import { criar } from "./in/criar";
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';
import { autorizacaoMiddleware } from '../../../middleware/autorizacao-middleware';
import { PapeisUsuario } from '../../../enums/papeisUsuarios';
import { deletar } from './in/deletar';

export async function curtidasRotas(app: Application) {
    /**
     * @openapi
     * /postagem/{postagemID}/curtida:
     *   post:
     *     summary: Cadastra uma nova curtida
     *     description: Cria uma curtida para a postagem informada.
     *     tags:
     *       - Curtidas
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: postagemID
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da postagem que será curtida.
     *     responses:
     *       201:
     *         description: Curtida cadastrada com sucesso.
     *       400:
     *         description: Erro de validação.
     */

    app.post('/postagem/:postagemID/curtida', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.ESTUDANTE, PapeisUsuario.SUPORTE), criar);


    /**
     * @openapi
     * /postagem/{postagemID}/curtida:
     *   delete:
     *     summary: Remove uma curtida existente
     *     description: Remove a curtida do usuário autenticado na postagem.
     *     tags:
     *       - Curtidas
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: postagemID
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da postagem da qual a curtida será removida.
     *     responses:
     *       200:
     *         description: Curtida removida com sucesso.
     *       400:
     *         description: Erro de validação.
     */
    app.delete('/postagem/:postagemID/curtida', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.ESTUDANTE, PapeisUsuario.SUPORTE), deletar);
}