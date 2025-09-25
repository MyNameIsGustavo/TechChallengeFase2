import type { IUsuario, IUsuarioModificacao } from "../../entities/models/usuario.interface";
import type { IUsuarioRepository } from "../usuario.repository.interface";
import { prisma } from "../../prismaClient";

export class UsuarioRepository implements IUsuarioRepository {

    async editarUsuario(id: number, usuario: IUsuarioModificacao): Promise<IUsuarioModificacao | null> {
        try {
            const usuarioExistente = await prisma.cH_usuario.findUnique({ where: { id: id } });

            if (!usuarioExistente) throw new Error(`Usuário com ID ${id} não encontrado.`);

            const usuarioAtualizado = await prisma.cH_usuario.update({
                data: {
                    nomeCompleto: usuario.nomeCompleto,
                    email: usuario.email,
                    telefone: usuario.telefone,
                    papelUsuarioID: usuario.papelUsuarioID,
                    senha: usuario.senha
                }, where: { id: id }
            })
            return usuarioAtualizado as IUsuario;
        } catch (error) {
            throw new Error(`Erro ao editar usuário: ${error}`);
        }
    }

    async criarUsuario(usuario: IUsuario): Promise<IUsuario | null> {
        try {
            const novoUsuario = await prisma.cH_usuario.create({
                data: {
                    nomeCompleto: usuario.nomeCompleto,
                    senha: usuario.senha,
                    email: usuario.email,
                    telefone: usuario.telefone,
                    papelUsuarioID: usuario.papelUsuarioID
                }
            });

            const usuarioCriado: IUsuario = {
                id: novoUsuario.id,
                nomeCompleto: novoUsuario.nomeCompleto,
                senha: novoUsuario.senha,
                email: novoUsuario.email,
                telefone: novoUsuario.telefone,
                papelUsuarioID: novoUsuario.papelUsuarioID,
                dataCadastro: novoUsuario.dataCadastro,
            };

            return usuarioCriado as IUsuario;
        } catch (error) {
            throw new Error(`Erro ao criar usuário` + error);
        }
    }

    async deletarUsuario(id: number): Promise<IUsuario | null> {
        try {
            const usuarioExistente = await prisma.cH_usuario.findUnique({
                where: { id: id }
            });

            if (!usuarioExistente) throw new Error(`Usuário com ID ${id} não encontrado.`);

            await prisma.cH_usuario.delete({ where: { id: id } });

            return usuarioExistente as IUsuario;
        } catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error}`);
        }
    }

    async buscarTodosUsuarios(): Promise<IUsuario[]> {
        try {
            const usuarios = await prisma.cH_usuario.findMany();

            if (usuarios.length === 0) {
                return [];
            }

            return usuarios as IUsuario[];
        } catch (error) {
            throw new Error(`Erro ao buscar todos usuários: ${error}`);
        }
    }

    async buscarUsuarioPorID(id: number): Promise<IUsuario | null> {
        try {
            const usuarioExistente = await prisma.cH_usuario.findUnique({
                where: { id: id }
            });

            if (!usuarioExistente) throw new Error(`Usuário com ID ${id} não encontrado.`);

            return usuarioExistente as IUsuario;
        } catch (error) {
            throw new Error(`Erro ao buscar usuário por ID: ${error}`);
        }
    }

    async buscarUsuarioPorEmail(email: string): Promise<IUsuario | null> {
        try {
            const usuarioExistente = await prisma.cH_usuario.findUnique({
                where: { email: email }
            });

            if (!usuarioExistente) throw new Error(`Usuário com email ${email} não encontrado.`);

            return usuarioExistente as IUsuario;
        } catch (error) {
            throw new Error(`Erro ao buscar usuário por email: ${error}`);
        }
    }
}
