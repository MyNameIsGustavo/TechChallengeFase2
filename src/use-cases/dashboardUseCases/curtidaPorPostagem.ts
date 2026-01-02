import { ICurtidasPorPostagem } from "../../entities/models/dashboard.interface";
import type { IDashboardRepository } from "../../repositories/dashboard.repository.interface";

export class CurtidaPorPostagemUseCase {
    constructor(private dashboardRepository: IDashboardRepository) { }

    async processar(): Promise<ICurtidasPorPostagem[]> {
        return this.dashboardRepository.curtidasPorPostagem();
    }
}