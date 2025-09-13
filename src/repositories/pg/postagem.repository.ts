import { PrismaClient } from "@prisma/client";
import type { IPostagem, IPostagemModificacao } from "../../entities/models/postagem.interface";
import type { IPostagemRepository } from "../postagem.repository.interface";

const prisma = new PrismaClient();

export class PostagemRepository implements IPostagemRepository {
    async criarPostagem(postagem: IPostagem): Promise<IPostagem | null> {
        try {
            const novaPostagem = await prisma.cH_postagem.create({
                data: {
                    titulo: postagem.titulo,
                    descricao: postagem.descricao,
                    visibilidade: postagem.visibilidade,
                    caminhoImagem: postagem.caminhoImagem,
                    autorID: postagem.autorID
                }
            });

            const postagemCriada: IPostagem = {
                id: novaPostagem.id,
                titulo: novaPostagem.titulo,
                descricao: novaPostagem.descricao,
                dataPublicacao: novaPostagem.dataPublicacao,
                autorID: novaPostagem.autorID,
                caminhoImagem: novaPostagem.caminhoImagem,
                visibilidade: novaPostagem.visibilidade
            };

            return postagemCriada as IPostagem;
        } catch (error) {
            throw new Error(`Erro ao criar postagem: ${error}`);
        }
    }

    async deletarPostagem(id: number): Promise<IPostagem | null> {
        try {
            const postagemExistente = await prisma.cH_postagem.findUnique({
                where: { id: id }
            });

            if (!postagemExistente) throw new Error(`Postagem com ID ${id} não encontrado.`);

            await prisma.cH_postagem.delete({ where: { id: id } });

            return postagemExistente as IPostagem;
        } catch (error) {
            throw new Error(`Erro ao deletar postagem: ${error}`);
        }
    }

    async buscarPostagemPorID(id: number): Promise<IPostagem | null> {
        try {
            const postagemExistente = await prisma.cH_postagem.findUnique({
                where: { id: id }
            });

            if (!postagemExistente) throw new Error(`Postagem com ID ${id} não encontrado.`);

            return postagemExistente as IPostagem;
        } catch (error) {
            throw new Error(`Erro ao buscar postagem por ID: ${error}`);
        }
    }

    async buscarTodasPostagens(): Promise<IPostagem[]> {
        try {
            const postagens = await prisma.cH_postagem.findMany();

            if (postagens.length === 0) {
                return [];
            }

            return postagens as IPostagem[];
        } catch (error) {
            throw new Error(`Erro ao buscar todas postagens: ${error}`);
        }
    }

    async editarPostagem(id: number, postagem: IPostagem): Promise<IPostagemModificacao | null> {
        try {
            const postagemExistente = await prisma.cH_postagem.findUnique({ where: { id: id } });

            if (!postagemExistente) throw new Error(`Postagem com ID ${id} não encontrado.`);

            const postagemAtualizada = await prisma.cH_postagem.update({
                data: {
                    titulo: postagem.titulo,
                    descricao: postagem.descricao,
                    visibilidade: postagem.visibilidade,
                    caminhoImagem: postagem.caminhoImagem,
                }, where: { id: id }
            })
            return postagemAtualizada as IPostagem;
        } catch (error) {
            throw new Error(`Erro ao editar postagem: ${error}`);
        }
    }
}
