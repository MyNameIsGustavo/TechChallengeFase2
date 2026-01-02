import type { Application } from 'express';
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';
import { autorizacaoMiddleware } from '../../../middleware/autorizacao-middleware';
import { PapeisUsuario } from '../../../enums/papeisUsuarios';
import { usuarioPorPapel } from './in/usuarioPorPapel';
import { usuarioPorPostagem } from './in/usuarioPorPostagem';
import { curtidaPorPostagem } from './in/curtidaPorPostagem';
import { comentarioPorPostagem } from './in/comentarioPorPostagem';
import { postagemPorMes } from './in/postagemPorMes';

export async function dashboardRotas(app: Application) {
    /**
     * @openapi
     * /dashboard/usuarioPorPapel:
     *   get:
     *     summary: Quantidade de usuários por papel
     *     description: Retorna a quantidade de usuários agrupados por papel de usuário.
     *     tags:
     *       - Dashboard
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Dados retornados com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   papel:
     *                     type: string
     *                     example: DOCENTE
     *                   total:
     *                     type: integer
     *                     example: 5
     *       401:
     *         description: Não autorizado.
     *       403:
     *         description: Acesso negado.
     */
    app.get('/dashboard/usuarioPorPapel', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.SUPORTE), usuarioPorPapel);


    /**
     * @openapi
     * /dashboard/usuarioPorPostagem:
     *   get:
     *     summary: Quantidade de postagens por usuário
     *     description: Retorna a quantidade de postagens agrupadas por usuário.
     *     tags:
     *       - Dashboard
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Dados retornados com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   usuario:
     *                     type: string
     *                     example: Professor Gustavo
     *                   totalPostagens:
     *                     type: integer
     *                     example: 12
     *       401:
     *         description: Não autorizado.
     *       403:
     *         description: Acesso negado.
     */
    app.get('/dashboard/usuarioPorPostagem', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.SUPORTE), usuarioPorPostagem);

    /**
     * @openapi
     * /dashboard/curtidaPorPostagem:
     *   get:
     *     summary: Retorna a quantidade de curtidas por postagem
     *     description: Retorna um resumo com o total de curtidas agrupadas por postagem.
     *     tags:
     *       - Dashboard
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Dados de curtidas por postagem retornados com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   postagemId:
     *                     type: integer
     *                     example: 10
     *                   titulo:
     *                     type: string
     *                     example: Introdução ao Prisma
     *                   totalCurtidas:
     *                     type: integer
     *                     example: 25
     *       401:
     *         description: Não autorizado.
     *       403:
     *         description: Acesso negado.
     */
    app.get('/dashboard/curtidaPorPostagem', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.SUPORTE), curtidaPorPostagem);

    /**
     * @openapi
     * /dashboard/comentarioPorPostagem:
     *   get:
     *     summary: Retorna a quantidade de comentários por postagem
     *     description: Retorna um resumo com o total de comentários agrupados por postagem.
     *     tags:
     *       - Dashboard
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Dados de comentários por postagem retornados com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   postagemId:
     *                     type: integer
     *                     example: 10
     *                   titulo:
     *                     type: string
     *                     example: Introdução ao Prisma
     *                   totalComentarios:
     *                     type: integer
     *                     example: 12
     *       401:
     *         description: Não autorizado.
     *       403:
     *         description: Acesso negado.
     */
    app.get('/dashboard/comentarioPorPostagem', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.SUPORTE), comentarioPorPostagem);

    /**
     * @openapi
     * /dashboard/postagemPorMes:
     *   get:
     *     summary: Retorna a quantidade de postagens por mês
     *     description: Retorna o total de postagens agrupadas por mês (YYYY-MM).
     *     tags:
     *       - Dashboard
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Dados de postagens por mês retornados com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   mes:
     *                     type: string
     *                     example: 2026-01
     *                   total:
     *                     type: integer
     *                     example: 18
     *       401:
     *         description: Não autorizado.
     *       403:
     *         description: Acesso negado.
     */
    app.get('/dashboard/postagemPorMes', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.SUPORTE), postagemPorMes);
}
