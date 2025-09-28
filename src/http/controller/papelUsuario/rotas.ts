import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from "./in/deletar";
import { buscarPorID } from "./in/buscarPorID";
import { buscarTodos } from "./in/buscarTodos";
import { editar } from "./in/editar";
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';

export async function papelUsuarioRotas(app: Application) {

    /**
     * @openapi
     * /papelUsuario:
     *   post:
     *     summary: Faz o cadastro de papel usuário
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               papel:
     *                  type: string
     *                  example: Coordenador
     *     responses:
     *       200:
     *         description: Papel usuario cadastrado com sucesso.
     *       400:
     *         description: Erro de validação.
     */
    app.post('/papelUsuario', autenticacaoMiddleware, criar);

    /**
    * @openapi
    * /papelUsuario/{id}:
    *   delete:
    *     summary: Faz a deleção de um papel usuário
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: integer
    *         description: ID de um papel usuário a ser deletado
    *     responses:
    *       200:
    *         description: Usuário deletado com sucesso.
    *       400:
    *         description: ID fornecido não é numérico.
    *       404:
    *         description: Usuário não encontrado.
    */
    app.delete('/papelUsuario/:id', autenticacaoMiddleware, deletar);

    /**
    * @openapi
    * /papelUsuario/{id}:
    *   get:
    *     summary: Busca papel usuário por ID
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: integer
    *         description: ID do papel usuário a ser selecionado
    *     responses:
    *       201:
    *         description: Usuário selecionado com sucesso.
    *       400:
    *         description: ID fornecido não é numérico.
    *       404:
    *         description: Usuário não encontrado.
    */
    app.get('/papelUsuario/:id', autenticacaoMiddleware, buscarPorID);

    /**
    * @openapi
    * /papelUsuario:
    *   get:
    *     summary: Buscas papéis usuários
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       201:
    *         description: Papéis usuários selecionados com sucesso.
    */
    app.get('/papelUsuario', autenticacaoMiddleware, buscarTodos);

    /**
     * @openapi
     * /papelUsuario/{id}:
     *   put:
     *     summary: Atualiza um papel usuário pelo ID
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do papel usuário a ser atualizado
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               papel:
     *                 type: string
     *     responses:
     *       200:
     *         description: Papel usuário atualizado com sucesso.
     *       400:
     *         description: Dados inválidos.
     *       401:
     *         description: Não autorizado.
     *       404:
     *         description: Usuário não encontrado.
     */
    app.put('/papelUsuario/:id', autenticacaoMiddleware, editar);
}