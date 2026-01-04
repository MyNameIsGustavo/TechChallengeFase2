import { prisma } from "../../prismaClient";
import { IComentariosPorPostagem, ICurtidasPorPostagem, IPostagemPorMes, IUsuarioPorPapel, IUsuarioPorPostagem } from "../../entities/models/dashboard.interface";
import { IDashboardRepository } from "../dashboard.repository.interface";

export class DashboardRepository implements IDashboardRepository {
    async usuariosPorPapel(): Promise<IUsuarioPorPapel[]> {
        try {
            const usuariosPorPapel = await prisma.cH_usuario.groupBy({
                by: ['papelUsuarioID'],
                _count: {
                    id: true
                }
            });

            const papeis = await prisma.cH_papelUsuario.findMany({
                select: {
                    id: true,
                    papelUsuario: true
                }
            });

            const resultado: IUsuarioPorPapel[] = usuariosPorPapel.map(item => {
                const papel = papeis.find(p => p.id === item.papelUsuarioID);

                return {
                    papel: papel?.papelUsuario ?? 'Desconhecido',
                    total: item._count.id
                };
            });

            return resultado;
        } catch (error) {
            throw new Error(`Erro ao obter usuários por papel: ${error}`);
        }
    }

    async usuarioPorPostagem(): Promise<IUsuarioPorPostagem[]> {
        try {
            const postagensPorUsuario = await prisma.cH_usuario.findMany({
                where: {
                    papelUsuarioID: {
                        not: 2
                    }
                },
                select: {
                    nomeCompleto: true,
                    _count: {
                        select: { postagens: true }
                    }
                }
            });

            const resultado = postagensPorUsuario.map(u => ({
                usuario: u.nomeCompleto,
                total: u._count.postagens
            }));

            return resultado;
        } catch (error) {
            throw new Error(`Erro ao obter usuários por postagem: ${error}`);
        }
    }

    async curtidasPorPostagem(): Promise<ICurtidasPorPostagem[]> {
        try {
            const curtidasPorPostagem = await prisma.cH_postagem.findMany({
                select: {
                    titulo: true,
                    _count: {
                        select: { curtidas: true }
                    }
                }
            });

            const resultado = curtidasPorPostagem.map(p => ({
                titulo: p.titulo,
                totalCurtidas: p._count.curtidas
            }));

            return resultado;
        } catch (error) {
            throw new Error(`Erro ao obter curtidas por postagem: ${error}`);
        }
    }

    async comentariosPorPostagem(): Promise<IComentariosPorPostagem[]> {
        try {
            const comentariosPorPostagem = await prisma.cH_postagem.findMany({
                select: {
                    titulo: true,
                    _count: {
                        select: { comentarios: true }
                    }
                }
            });

            const resultado = comentariosPorPostagem.map(p => ({
                titulo: p.titulo,
                totalComentarios: p._count.comentarios
            }));

            return resultado;
        } catch (error) {
            throw new Error(`Erro ao obter comentários por postagem: ${error}`);
        }
    }

    async postagensPorMes(): Promise<IPostagemPorMes[]> {
        try {
            const postagens = await prisma.cH_postagem.findMany({
                select: {
                    dataPublicacao: true
                }
            });

            const agrupadoPorMes = postagens.reduce((acc, p) => {
                const data = p.dataPublicacao;
                const mes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
                acc[mes] = (acc[mes] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const resultado = Object.entries(agrupadoPorMes).map(([mes, total]) => ({
                mes: mes,
                totalPostagens: total
            }));

            return resultado;
        } catch (error) {
            throw new Error(`Erro ao obter postagem por mes: ${error}`);
        }
    }
}
