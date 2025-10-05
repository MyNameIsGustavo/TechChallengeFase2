import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from './in/deletar';
import { buscarPorID } from './in/buscarPorID';
import { buscarTodos } from './in/buscarTodos';
import { editar } from './in/editar';
import { buscarPorPalavraChave } from './in/buscarPorPalavraChave';
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';
import { autorizacaoMiddleware } from '../../../middleware/autorizacao-middleware';
import { PapeisUsuario } from '../../../enums/papeisUsuarios';
import { uploadImagemMiddleware } from '../../../middleware/uploadImagem-middleware';

export async function postagemRotas(app: Application) {

  /**
   * @openapi
   * /postagem:
   *   post:
   *     summary: Cadastra uma nova postagem
   *     description: Cria uma postagem com título, descrição, caminho da imagem, visibilidade e ID do autor.
   *     tags:
   *       - Postagens
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               caminhoImagem:
   *                 type: string
   *                 example: C:\\DOWNLOADS
   *               titulo:
   *                 type: string
   *                 example: Aula de JavaScript
   *               descricao:
   *                 type: string
   *                 example: Introdução ao JavaScript
   *               visibilidade:
   *                 type: boolean
   *                 example: true
   *               autorID:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       200:
   *         description: Postagem cadastrada com sucesso.
   *       400:
   *         description: Erro de validação.
   */
  app.post('/postagem', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE), uploadImagemMiddleware.single("caminhoImagem"), criar);

  /**
   * @openapi
   * /postagem/{id}:
   *   delete:
   *     summary: Deleta uma postagem
   *     description: Remove uma postagem existente com base no ID informado.
   *     tags:
   *       - Postagens
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da postagem a ser deletada.
   *     responses:
   *       200:
   *         description: Postagem deletada com sucesso.
   *       400:
   *         description: ID fornecido não é numérico.
   *       404:
   *         description: Postagem não encontrada.
   */
  app.delete('/postagem/:id', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE), deletar);

  /**
   * @openapi
   * /postagem/palavraChave:
   *   get:
   *     summary: Buscar postagens por palavra-chave
   *     description: Retorna uma lista de postagens cujo título ou conteúdo contenham a palavra-chave informada.
   *     tags:
   *       - Postagens
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: palavra
   *         required: true
   *         schema:
   *           type: string
   *           minLength: 3
   *         description: Palavra-chave para busca nas postagens.
   *     responses:
   *       200:
   *         description: Lista de postagens encontradas.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   caminhoImagem:
   *                     type: string
   *                     example: C:\\DOWNLOADS
   *                   titulo:
   *                     type: string
   *                     example: Aula de JavaScript
   *                   descricao:
   *                     type: string
   *                     example: Introdução ao JavaScript
   *                   visibilidade:
   *                     type: boolean
   *                     example: true
   *                   autorID:
   *                     type: integer
   *                     example: 1
   *       400:
   *         description: Falta o parâmetro de busca `palavra`.
   *       401:
   *         description: Não autorizado.
   *       500:
   *         description: Erro interno do servidor.
   */
  app.get('/postagem/palavraChave', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.ESTUDANTE), buscarPorPalavraChave);

  /**
   * @openapi
   * /postagem/{id}:
   *   get:
   *     summary: Busca postagem por ID
   *     description: Retorna uma postagem específica pelo seu ID.
   *     tags:
   *       - Postagens
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da postagem.
   *     responses:
   *       200:
   *         description: Postagem encontrada com sucesso.
   *       400:
   *         description: ID fornecido não é numérico.
   *       404:
   *         description: Postagem não encontrada.
   */
  app.get('/postagem/:id', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.ESTUDANTE), buscarPorID);

  /**
   * @openapi
   * /postagem:
   *   get:
   *     summary: Lista todas as postagens
   *     description: Retorna todas as postagens cadastradas.
   *     tags:
   *       - Postagens
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de postagens retornada com sucesso.
   */
  app.get('/postagem', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE, PapeisUsuario.ESTUDANTE), buscarTodos);

  /**
   * @openapi
   * /postagem/{id}:
   *   put:
   *     summary: Atualiza uma postagem
   *     description: Atualiza os dados de uma postagem existente pelo ID informado.
   *     tags:
   *       - Postagens
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da postagem a ser atualizada.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               titulo:
   *                 type: string
   *               descricao:
   *                 type: string
   *               caminhoImagem:
   *                 type: string
   *               visibilidade:
   *                 type: boolean
   *             example:
   *               titulo: Trabalho de JavaScript
   *               descricao: Entrega no final do semestre
   *               caminhoImagem: C://DOWNLOADS
   *               visibilidade: true
   *     responses:
   *       200:
   *         description: Postagem atualizada com sucesso.
   *       400:
   *         description: Dados inválidos.
   *       401:
   *         description: Não autorizado.
   *       404:
   *         description: Postagem não encontrada.
   */
  app.put("/postagem/:id", autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE), editar);
}