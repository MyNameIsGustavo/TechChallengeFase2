import { IComentariosPorPostagem, ICurtidasPorPostagem } from "../../entities/models/dashboard.interface";
import type { IDashboardRepository } from "../../repositories/dashboard.repository.interface";

export class ComentarioPorPostagemUseCase {
    constructor(private dashboardRepository: IDashboardRepository) { }

    async processar(): Promise<IComentariosPorPostagem[]> {
        return this.dashboardRepository.comentariosPorPostagem();
    }
}