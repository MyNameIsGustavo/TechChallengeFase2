import { prisma } from "../../prismaClient";
import type { IPostagem, IPostagemCompleta, IPostagemModificacao } from "../../entities/models/postagem.interface";
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
            const postagemExistente = await prisma.cH_postagem.findUnique({ where: { id: id } });

            if (!postagemExistente) throw new Error(`Postagem com ID ${id} não encontrado.`);

            await prisma.cH_postagem.delete({ where: { id: id } });
            return postagemExistente as IPostagem;
        } catch (error) {
            throw new Error(`Erro ao deletar postagem: ${error}`);
        }
    }

    async buscarPostagemPorID(id: number, usuarioID: number): Promise<IPostagemCompleta | null> {
        try {
            const postagem = await prisma.cH_postagem.findUnique({
                where: { id },
                include: {
                    autor: {
                        select: {
                            id: true,
                            nomeCompleto: true,
                            caminhoImagem: true
                        }
                    },
                    curtidas: {
                        include: {
                            usuario: {
                                select: {
                                    id: true,
                                    nomeCompleto: true
                                }
                            }
                        }
                    },
                    comentarios: {
                        orderBy: {
                            dataCriacao: "desc"
                        },
                        include: {
                            usuario: {
                                select: {
                                    id: true,
                                    nomeCompleto: true,
                                    email: true,
                                    caminhoImagem: true
                                }
                            }
                        }
                    }
                }
            });


            if (!postagem) return null;

            const usuarioCurtiu = postagem.curtidas.some(
                curtida => curtida.usuarioID === usuarioID
            );

            return {
                id: postagem.id,
                titulo: postagem.titulo,
                descricao: postagem.descricao,
                visibilidade: postagem.visibilidade,
                dataPublicacao: postagem.dataPublicacao,
                caminhoImagem: postagem.caminhoImagem,

                autor: postagem.autor,

                estatisticas: {
                    totalCurtidas: postagem.curtidas.length,
                    totalComentarios: postagem.comentarios.length,
                    usuarioCurtiu
                },

                curtidas: postagem.curtidas.map(curtida => ({
                    id: curtida.usuario.id,
                    nomeCompleto: curtida.usuario.nomeCompleto
                })),

                comentarios: postagem.comentarios.map(comentario => ({
                    id: comentario.id,
                    conteudo: comentario.conteudo,
                    dataCriacao: comentario.dataCriacao,
                    usuario: comentario.usuario,
                }))
            };

        } catch (error) {
            throw new Error(`Erro ao buscar postagem por ID: ${error}`);
        }
    }

    async buscarTodasPostagens(usuarioID?: number): Promise<IPostagemCompleta[]> {
        try {
            const postagens = await prisma.cH_postagem.findMany({
                include: {
                    autor: {
                        select: {
                            id: true,
                            nomeCompleto: true,
                            caminhoImagem: true
                        }
                    },
                    curtidas: {
                        include: {
                            usuario: {
                                select: {
                                    id: true,
                                    nomeCompleto: true,
                                    caminhoImagem: true
                                }
                            }
                        }
                    },
                    comentarios: {
                        orderBy: {
                            dataCriacao: "desc"
                        },
                        include: {
                            usuario: {
                                select: {
                                    id: true,
                                    nomeCompleto: true,
                                    email: true,
                                    caminhoImagem: true
                                }
                            }
                        }
                    }
                }
            });

            return postagens.map(postagem => {
                const usuarioCurtiu = usuarioID
                    ? postagem.curtidas.some(
                        curtida => curtida.usuario.id === usuarioID
                    )
                    : false;

                return {
                    id: postagem.id,
                    titulo: postagem.titulo,
                    descricao: postagem.descricao,
                    visibilidade: postagem.visibilidade,
                    dataPublicacao: postagem.dataPublicacao,
                    caminhoImagem: postagem.caminhoImagem,

                    autor: postagem.autor,

                    curtidas: postagem.curtidas.map(curtida => ({
                        id: curtida.usuario.id,
                        nomeCompleto: curtida.usuario.nomeCompleto,
                        caminhoImagem: curtida.usuario.caminhoImagem ?? null
                    })),

                    estatisticas: {
                        totalCurtidas: postagem.curtidas.length,
                        totalComentarios: postagem.comentarios.length,
                        usuarioCurtiu
                    },

                    comentarios: postagem.comentarios.map(comentario => ({
                        id: comentario.id,
                        conteudo: comentario.conteudo,
                        dataCriacao: comentario.dataCriacao,
                        usuario: comentario.usuario
                    }))
                };
            });

        } catch (error) {
            throw new Error(`Erro ao buscar todas postagens: ${error}`);
        }
    }


    async editarPostagem(id: number, postagem: IPostagemModificacao): Promise<IPostagemModificacao | null> {
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

    async buscarPostagensPorPalavraChave(
        palavraChave: string,
        usuarioID: number,
    ): Promise<IPostagemCompleta[]> {
        try {
            const postagens = await prisma.cH_postagem.findMany({
                where: {
                    OR: [
                        { titulo: { contains: palavraChave, mode: "insensitive" } },
                        { descricao: { contains: palavraChave, mode: "insensitive" } }
                    ]
                },
                include: {
                    autor: {
                        select: {
                            id: true,
                            nomeCompleto: true,
                            caminhoImagem: true
                        }
                    },
                    curtidas: {
                        select: {
                            usuarioID: true,
                            usuario: {
                                select: {
                                    id: true,
                                    nomeCompleto: true,
                                    caminhoImagem: true
                                }
                            }
                        }
                    },
                    comentarios: {
                        orderBy: {
                            dataCriacao: "desc"
                        },
                        include: {
                            usuario: {
                                select: {
                                    id: true,
                                    nomeCompleto: true,
                                    email: true,
                                    caminhoImagem: true
                                }
                            }
                        }
                    }
                }
            });

            return postagens.map(postagem => {
                const usuarioCurtiu = usuarioID
                    ? postagem.curtidas.some(
                        curtida => curtida.usuarioID === usuarioID
                    )
                    : false;

                return {
                    id: postagem.id,
                    titulo: postagem.titulo,
                    descricao: postagem.descricao,
                    visibilidade: postagem.visibilidade,
                    dataPublicacao: postagem.dataPublicacao,
                    caminhoImagem: postagem.caminhoImagem,

                    autor: postagem.autor,

                    curtidas: postagem.curtidas.map(curtida => ({
                        id: curtida.usuario.id,
                        nomeCompleto: curtida.usuario.nomeCompleto,
                        caminhoImagem: curtida.usuario.caminhoImagem || null
                    })),

                    comentarios: postagem.comentarios.map(comentario => ({
                        id: comentario.id,
                        conteudo: comentario.conteudo,
                        dataCriacao: comentario.dataCriacao,
                        usuario: comentario.usuario
                    })),

                    estatisticas: {
                        totalCurtidas: postagem.curtidas.length,
                        totalComentarios: postagem.comentarios.length,
                        usuarioCurtiu
                    }
                };
            });

        } catch (error) {
            throw new Error(
                `Erro ao buscar postagem por palavra chave: ${error}`
            );
        }
    }
}
