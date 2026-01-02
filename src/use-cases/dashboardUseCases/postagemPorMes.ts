import { IPostagemPorMes } from "../../entities/models/dashboard.interface";
import type { IDashboardRepository } from "../../repositories/dashboard.repository.interface";

export class PostagemPorMesUseCase {
    constructor(private dashboardRepository: IDashboardRepository) { }

    async processar(): Promise<IPostagemPorMes[]> {
        return this.dashboardRepository.postagensPorMes();
    }
}