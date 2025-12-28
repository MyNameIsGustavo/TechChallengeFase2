import { prisma } from "../../prismaClient";
import type { IPostagem, IPostagemModificacao } from "../../entities/models/postagem.interface";
import type { IPostagemRepository } from "../postagem.repository.interface";

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

    async buscarPostagemPorID(id: number): Promise<IPostagem & { totalCurtidas: number } | null> {
        try {
            const postagemExistente = await prisma.cH_postagem.findUnique({
                where: { id },
                include: {
                    curtidas: {
                        select: { postagemID: true } 
                    }
                }
            });

            if (!postagemExistente) return null;

            const { curtidas, ...rest } = postagemExistente;

            return {
                ...rest,
                totalCurtidas: curtidas.length
            };
        } catch (error) {
            throw new Error(`Erro ao buscar postagem por ID: ${error}`);
        }
    }


    async buscarTodasPostagens(): Promise<(IPostagem & { totalCurtidas: number })[]> {
        try {
            const postagens = await prisma.cH_postagem.findMany({
                include: {
                    curtidas: {
                        select: { postagemID: true }
                    }
                }
            });

            return postagens.map(postagem => ({
                ...postagem,
                totalCurtidas: postagem.curtidas.length
            }));
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

    async buscarPostagensPorPalavraChave(palavraChave: string): Promise<IPostagem[]> {
        try {
            const postagens = await prisma.cH_postagem.findMany({
                where: {
                    OR: [
                        { titulo: { contains: palavraChave, mode: 'insensitive' } },
                        { descricao: { contains: palavraChave, mode: 'insensitive' } }
                    ]
                }
            });
            if (postagens.length === 0) return [];

            return postagens as IPostagem[];
        } catch (error) {
            throw new Error(`Erro ao buscar postagem por palavra chave: ${error}`);
        }
    }
}
