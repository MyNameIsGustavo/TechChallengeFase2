import type { Application } from 'express';
import { criar } from "./in/criar";
import { deletar } from "./in/deletar";
import { buscarTodos } from './in/buscarTodos';
import { buscarPorID } from './in/buscarPorID';
import { editar } from '../papelUsuario/in/editar';
import { login } from './in/login';
import { autenticacaoMiddleware } from '../../../middleware/autenticacao-middleware';
import { autorizacaoMiddleware } from '../../../middleware/autorizacao-middleware';
import { PapeisUsuario } from '../../../enums/papeisUsuarios';

export async function usuarioRotas(app: Application) {

  /**
   * @openapi
   * /login:
   *   post:
   *     summary: Faz login do usuário
   *     description: Autentica um usuário e retorna um token JWT.
   *     tags:
   *       - Usuários
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
   *     summary: Cadastra um novo usuário
   *     description: Cria um usuário com nome, telefone, papel de usuário, email e senha.
   *     tags:
   *       - Usuários
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
   *                 type: string
   *                 example: Gustavo Rocha
   *               telefone:
   *                 type: string
   *                 example: 15992604299
   *               papelUsuarioID:
   *                 type: integer
   *                 example: 1
   *               email:
   *                 type: string
   *                 example: gustavo.rochamaia@fiap.com.br
   *               senha:
   *                 type: string
   *                 example: 123456
   *     responses:
   *       200:
   *         description: Usuário cadastrado com sucesso.
   *       400:
   *         description: Erro de validação.
   */
  app.post('/usuarios', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE), criar);

  /**
   * @openapi
   * /usuarios:
   *   get:
   *     summary: Lista todos os usuários
   *     description: Retorna todos os usuários cadastrados.
   *     tags:
   *       - Usuários
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de usuários retornada com sucesso.
   */
  app.get('/usuarios', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE), buscarTodos);

  /**
   * @openapi
   * /usuarios/{id}:
   *   get:
   *     summary: Busca usuário por ID
   *     description: Retorna um usuário específico pelo seu ID.
   *     tags:
   *       - Usuários
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário a ser retornado.
   *     responses:
   *       200:
   *         description: Usuário encontrado com sucesso.
   *       400:
   *         description: ID fornecido não é numérico.
   *       404:
   *         description: Usuário não encontrado.
   */
  app.get('/usuarios/:id', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE), buscarPorID);

  /**
   * @openapi
   * /usuarios/{id}:
   *   put:
   *     summary: Atualiza um usuário pelo ID
   *     description: Atualiza os dados de um usuário existente.
   *     tags:
   *       - Usuários
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário a ser atualizado.
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
   *                 type: integer
   *             example:
   *               nomeCompleto: João Silva
   *               senha: 1234567
   *               telefone: 11999999999
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
  app.put("/usuarios/:id", autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE), editar);

  /**
   * @openapi
   * /usuarios/{id}:
   *   delete:
   *     summary: Deleta um usuário
   *     description: Remove um usuário existente pelo seu ID.
   *     tags:
   *       - Usuários
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário a ser deletado.
   *     responses:
   *       200:
   *         description: Usuário deletado com sucesso.
   *       400:
   *         description: ID fornecido não é numérico.
   *       404:
   *         description: Usuário não encontrado.
   */
  app.delete('/usuarios/:id', autenticacaoMiddleware, autorizacaoMiddleware(PapeisUsuario.DOCENTE), deletar);
}