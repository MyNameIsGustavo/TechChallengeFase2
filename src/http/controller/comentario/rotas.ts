import type { Application } from 'express';
import { criar } from "./in/criar";
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';
import { autorizacaoMiddleware } from '../../../middleware/autorizacao-middleware';
import { PapeisUsuario } from '../../../enums/papeisUsuarios';
import { deletar } from './in/deletar'
import { buscarPorID } from './in/buscarPorID';
import { editar } from './in/editar';

export async function comentarioRotas(app: Application) {

    /**
     * @openapi
     * /postagem/{postagemID}/comentario:
     *   post:
     *     summary: Cadastra um novo comentário
     *     description: Cria um comentário com o ID da postagem e o ID do usuário.
     *     tags:
     *       - Comentarios
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: postagemID
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da postagem onde o comentário será adicionado.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               conteudo:
     *                 type: string
     *                 example: "Este é um comentário."
     *     responses:
     *       200:
     *         description: Comentário cadastrado com sucesso.
     *       400:
     *         description: Erro de validação.
     */
    app.post(
        '/postagem/:postagemID/comentario',
        autenticacaoMiddleware,
        autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.ESTUDANTE, PapeisUsuario.SUPORTE),
        criar
    );


    /**
     * @openapi
     * /comentario:
     *   delete:
     *     summary: Deleta um comentario
     *     description: Deleta um comentario com o ID da postagem e o ID do comentario.
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
     *               comentarioID:
     *                 type: integer
     *                 example: 2
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


    /**
     * @openapi
     * /postagem/{postagemID}/comentario/{comentarioID}:
     *   get:
     *     summary: Busca comentário por ID
     *     description: Retorna um comentário específico pelo seu ID dentro de uma postagem.
     *     tags:
     *       - Postagens
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: postagemID
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da postagem
     *       - in: path
     *         name: comentarioID
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do comentário
     *     responses:
     *       200:
     *         description: Comentário encontrado com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 postagemID:
     *                   type: integer
     *                 autorID:
     *                   type: integer
     *                 texto:
     *                   type: string
     *                 criadoEm:
     *                   type: string
     *                   format: date-time
     *       400:
     *         description: IDs fornecidos não são numéricos ou inválidos.
     *       404:
     *         description: Comentário não encontrado.
     */
    app.get(
        '/postagem/:postagemID/comentario/:comentarioID',
        autenticacaoMiddleware,
        autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.ESTUDANTE, PapeisUsuario.SUPORTE),
        buscarPorID
    );


    /**
   * @openapi
   * /postagem/{postagemID}/comentario/{comentarioID}:
   *   put:
   *     summary: Edita comentário por ID
   *     description: Atualiza o conteúdo de um comentário específico pelo seu ID dentro de uma postagem.
   *     tags:
   *       - Postagens
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: postagemID
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da postagem
   *       - in: path
   *         name: comentarioID
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do comentário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               conteudo:
   *                 type: string
   *                 example: "Este é o novo conteúdo do comentário."
   *     responses:
   *       200:
   *         description: Comentário editado com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 postagemID:
   *                   type: integer
   *                 autorID:
   *                   type: integer
   *                 conteudo:
   *                   type: string
   *                 criadoEm:
   *                   type: string
   *                   format: date-time
   *       400:
   *         description: IDs fornecidos não são numéricos ou inválidos.
   *       404:
   *         description: Comentário não encontrado.
   */

    app.put(
        '/postagem/:postagemID/comentario/:comentarioID',
        autenticacaoMiddleware,
        autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.ESTUDANTE, PapeisUsuario.SUPORTE),
        editar
    );
}
