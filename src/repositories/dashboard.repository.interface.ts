import { IComentariosPorPostagem, ICurtidasPorPostagem, IPostagemPorMes, IUsuarioPorPapel, IUsuarioPorPostagem } from "../entities/models/dashboard.interface";

export interface IDashboardRepository {
    usuariosPorPapel(): Promise<IUsuarioPorPapel[]>
    usuarioPorPostagem(): Promise<IUsuarioPorPostagem[]>
    curtidasPorPostagem(): Promise<ICurtidasPorPostagem[]>
    comentariosPorPostagem(): Promise<IComentariosPorPostagem[]>
    postagensPorMes(): Promise<IPostagemPorMes[]>
}