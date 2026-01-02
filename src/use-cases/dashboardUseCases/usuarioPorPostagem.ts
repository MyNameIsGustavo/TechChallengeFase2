import { IUsuarioPorPostagem } from "../../entities/models/dashboard.interface";
import type { IDashboardRepository } from "../../repositories/dashboard.repository.interface";

export class UsuarioPorPostagemUseCase {
    constructor(private dashboardRepository: IDashboardRepository) { }

    async processar(): Promise<IUsuarioPorPostagem[]> {
        return this.dashboardRepository.usuarioPorPostagem();
    }
}