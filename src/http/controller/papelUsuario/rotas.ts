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
   *     summary: Cadastra um novo papel de usuário
   *     description: Cria um novo papel para usuários, como "Coordenador", "Administrador", etc.
   *     tags:
   *       - Papel Usuário
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
   *                 type: string
   *                 example: Coordenador
   *     responses:
   *       200:
   *         description: Papel de usuário cadastrado com sucesso.
   *       400:
   *         description: Erro de validação.
   */
  app.post('/papelUsuario',  criar);

  /**
   * @openapi
   * /papelUsuario/{id}:
   *   get:
   *     summary: Busca um papel de usuário por ID
   *     description: Retorna um papel de usuário específico pelo seu ID.
   *     tags:
   *       - Papel Usuário
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do papel de usuário a ser retornado.
   *     responses:
   *       200:
   *         description: Papel de usuário encontrado com sucesso.
   *       400:
   *         description: ID fornecido não é numérico.
   *       404:
   *         description: Papel de usuário não encontrado.
   */
  app.get('/papelUsuario/:id', buscarPorID);

  /**
   * @openapi
   * /papelUsuario:
   *   get:
   *     summary: Lista todos os papéis de usuários
   *     description: Retorna todos os papéis cadastrados no sistema.
   *     tags:
   *       - Papel Usuário
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de papéis de usuários retornada com sucesso.
   */
  app.get('/papelUsuario', buscarTodos);

  /**
   * @openapi
   * /papelUsuario/{id}:
   *   put:
   *     summary: Atualiza um papel de usuário pelo ID
   *     description: Atualiza o nome de um papel de usuário existente.
   *     tags:
   *       - Papel Usuário
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do papel de usuário a ser atualizado.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               papel:
   *                 type: string
   *                 example: Administrador
   *     responses:
   *       200:
   *         description: Papel de usuário atualizado com sucesso.
   *       400:
   *         description: Dados inválidos.
   *       401:
   *         description: Não autorizado.
   *       404:
   *         description: Papel de usuário não encontrado.
   */
  app.put('/papelUsuario/:id', editar);

  /**
   * @openapi
   * /papelUsuario/{id}:
   *   delete:
   *     summary: Deleta um papel de usuário
   *     description: Remove um papel de usuário existente pelo seu ID.
   *     tags:
   *       - Papel Usuário
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do papel de usuário a ser deletado.
   *     responses:
   *       200:
   *         description: Papel de usuário deletado com sucesso.
   *       400:
   *         description: ID fornecido não é numérico.
   *       404:
   *         description: Papel de usuário não encontrado.
   */
  app.delete('/papelUsuario/:id', deletar);
}
