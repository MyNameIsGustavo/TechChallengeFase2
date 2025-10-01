import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from './in/deletar';
import { buscarPorID } from './in/buscarPorID';
import { buscarTodos } from './in/buscarTodos';
import { editar } from './in/editar';
import { buscarPorPalavraChave } from './in/buscarPorPalavraChave';
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';

export async function postagemRotas(app: Application) {

    /**
 * @openapi
 * /postagem:
 *   post:
 *     summary: Faz o cadastro de postagem
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
 *                  type: string
 *                  example: C:\\DOWNLOADS
 *               titulo: 
 *                  type: string
 *                  example: Aula de javascript
 *               descricao:
 *                  type: string
 *                  example: introdução ao javascript
 *               visibilidade:
 *                 type: boolean
 *                 example: true
 *               autorID:
 *                 type: Integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: postagem cadastrada com sucesso.
 *       400:
 *         description: Erro de validação.
 */
    app.post('/postagem', autenticacaoMiddleware, criar);

    /**
    * @openapi
    * /postagem/{id}:
    *   delete:
    *     summary: Faz a deleção de uma postagem
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: integer
    *         description: ID de uma postagem a ser deletada
    *     responses:
    *       200:
    *         description: Postagem deletada com sucesso.
    *       400:
    *         description: ID fornecido não é numérico.
    *       404:
    *         description: Postagem não encontrada.
    */
    app.delete('/postagem/:id', autenticacaoMiddleware, deletar);
    /**
 * @swagger
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
 *         description: Palavra-chave para buscar nas postagens.
 *     responses:
 *       200:
 *         description: Lista de postagens encontradas
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
 *                     example: Aula de javascript
 *                   descricao:
 *                     type: string
 *                     example: introdução ao javascript
 *                   visibilidade:
 *                     type: boolean
 *                     example: true
 *                   autorID:
 *                     type: integer
 *                     example: 1
 *       400:
 *         description: Falta o parâmetro de busca `palavra`
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 *       500:
 *         description: Erro interno do servidor
 */
    app.get('/postagem/palavraChave', autenticacaoMiddleware, buscarPorPalavraChave);

    /**
    * @openapi
    * /postagem/{id}:
    *   get:
    *     summary: Busca postagem por ID
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: integer
    *         description: ID da postagem a ser selecionado
    *     responses:
    *       201:
    *         description: postagem selecionada com sucesso.
    *       400:
    *         description: ID fornecido não é numérico.
    *       404:
    *         description: postagem não encontrada.
    */
    app.get('/postagem/:id', autenticacaoMiddleware, buscarPorID);

    /**
    * @openapi
    * /postagem:
    *   get:
    *     summary: Busca postagem
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       201:
    *         description: postagens selecionadas com sucesso.
    */
    app.get('/postagem', autenticacaoMiddleware, buscarTodos);

    /**
     * @openapi
     * /postagem/{id}:
     *   put:
     *     summary: Atualiza uma postagem pelo ID
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da postagem a ser atualizado
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
     *               titulo: Trabalho de Javascript
     *               descricao: Entrega no final do semestre
     *               caminhoImagem: "C://DOWNLOADS"
     *               visibilidade: true 
     *     responses:
     *       200:
     *         description: Postagem atualizado com sucesso.
     *       400:
     *         description: Dados inválidos.
     *       401:
     *         description: Não autorizado.
     *       404:
     *         description: Postagem não encontrado.
     */
    app.put("/postagem/:id", autenticacaoMiddleware, editar);
    
}