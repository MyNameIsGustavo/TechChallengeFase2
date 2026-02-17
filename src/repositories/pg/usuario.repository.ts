import type { IUsuario, IUsuarioAlteracao, IUsuarioModificacao } from "../../entities/models/usuario.interface";
import type { IUsuarioRepository } from "../usuario.repository.interface";
import { prisma } from "../../prismaClient";
import { Prisma } from "@prisma/client";

export class UsuarioRepository implements IUsuarioRepository {

    async alterarUsuario(id: number, usuario: IUsuarioAlteracao): Promise<IUsuarioModificacao | null> {
        try {
            const usuarioExistente = await prisma.cH_usuario.findUnique({ where: { id: id } });

            if (!usuarioExistente) throw new Error(`Usuário com ID ${id} não encontrado.`);

            const usuarioAtualizado = await prisma.cH_usuario.update({
                data: {
                    nomeCompleto: usuario.nomeCompleto,
                    telefone: usuario.telefone,
                    senha: usuario.senha!,
                    caminhoImagem: usuario.caminhoImagem || null
                }, where: { id: id }
            })
            return usuarioAtualizado as IUsuario;
        } catch (error) {
            throw new Error(`Erro ao editar usuário: ${error}`);
        }
    }

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
                    senha: usuario.senha!,
                    caminhoImagem: usuario.caminhoImagem || null
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
                    papelUsuarioID: usuario.papelUsuarioID,
                    caminhoImagem: usuario.caminhoImagem || null
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
                caminhoImagem: usuario.caminhoImagem || null
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

    async buscarTodosUsuarios( pagina = 1, limite = 10, papelUsuarioId?: number): Promise<{ usuarios: IUsuario[]; total: number }> {
        try {
            const skip = (pagina - 1) * limite;

            const where: Prisma.CH_usuarioWhereInput = {};

            if (papelUsuarioId !== undefined) {
                where.papelUsuario = {
                    id: papelUsuarioId
                };
            }

            const [usuarios, total] = await prisma.$transaction([
                prisma.cH_usuario.findMany({
                    where,
                    skip,
                    take: limite,
                    include: {
                        papelUsuario: true
                    }
                }),
                prisma.cH_usuario.count({ where })
            ]);

            return {
                usuarios: usuarios as IUsuario[],
                total
            };
        } catch (error) {
            throw new Error(`Erro ao buscar usuários: ${error}`);
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
