import { IUsuarioPorPapel } from "../../entities/models/dashboard.interface";
import type { IDashboardRepository } from "../../repositories/dashboard.repository.interface";

export class UsuarioPorPapelUseCase {
    constructor(private dashboardRepository: IDashboardRepository) { }

    async processar(): Promise<IUsuarioPorPapel[]> {
        return this.dashboardRepository.usuariosPorPapel()
    }
}