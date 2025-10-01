import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from "./in/deletar";
import { buscarTodos } from './in/buscarTodos';
import { buscarPorID } from './in/buscarPorID';
import { editar } from '../papelUsuario/in/editar';
import { login } from './in/login';
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';

export async function usuarioRotas(app: Application) {
    /**
     * @openapi
     * /login:
     *   post:
     *     summary: Faz login do usuário
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: gustavo.rochamaia@fiap.com.br
     *               senha:
     *                 type: string
     *                 example: 123456
     *     responses:
     *       200:
     *         description: Login realizado com sucesso.
     *       401:
     *         description: Credenciais inválidas.
     */
    app.post("/login", login);

    /**
     * @openapi
     * /usuarios:
     *   post:
     *     summary: Faz o cadastro de usuário
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nomeCompleto:
     *                  type: string
     *                  example: Gustavo Rocha
     *               telefone: 
     *                  type: string
     *                  example: 15992604299
     *               papelUsuarioID:
     *                  type: Integer
     *                  example: 1
     *               email:
     *                 type: string
     *                 example: gustavo.rochamaia@fiap.com.br
     *               senha:
     *                 type: string
     *                 example: 123456
     *     responses:
     *       200:
     *         description: usuario cadastrado com sucesso.
     *       400:
     *         description: Erro de validação.
     */
    app.post('/usuarios', criar);

    /**
    * @openapi
    * /usuarios:
    *   get:
    *     summary: Buscas usuários
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       201:
    *         description: Usuários selecionados com sucesso.
    */
    app.get('/usuarios', buscarTodos);

    /**
    * @openapi
    * /usuarios/{id}:
    *   get:
    *     summary: Busca usuário por ID
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: integer
    *         description: ID do usuário a ser selecionado
    *     responses:
    *       201:
    *         description: Usuário selecionado com sucesso.
    *       400:
    *         description: ID fornecido não é numérico.
    *       404:
    *         description: Usuário não encontrado.
    */
    app.get('/usuarios/:id', buscarPorID);
    
    /**
     * @openapi
     * /usuarios/{id}:
     *   put:
     *     summary: Atualiza um usuário pelo ID
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do usuário a ser atualizado
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nomeCompleto:
     *                 type: string
     *               senha:
     *                 type: string
     *               telefone:
     *                 type: string
     *               papelUsuarioID:
     *                 type: Integer
     *             example:
     *               nomeCompleto: "João Silva"
     *               senha: 1234567
     *               telefone: "11999999999"
     *               papelUsuarioID: 1 
     *     responses:
     *       200:
     *         description: Usuário atualizado com sucesso.
     *       400:
     *         description: Dados inválidos.
     *       401:
     *         description: Não autorizado.
     *       404:
     *         description: Usuário não encontrado.
     */
    app.put("/usuarios/:id",editar);

    /**
    * @openapi
    * /usuarios/{id}:
    *   delete:
    *     summary: Faz a deleção de um usuário
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: integer
    *         description: ID do usuário a ser deletado
    *     responses:
    *       200:
    *         description: Usuário deletado com sucesso.
    *       400:
    *         description: ID fornecido não é numérico.
    *       404:
    *         description: Usuário não encontrado.
    */
    app.delete('/usuarios/:id',  deletar);
}