import { DashboardRepository } from "../../../repositories/pg/dashboard.repository";
import { UsuarioPorPapelUseCase } from "../usuarioPorPapel";

export async function fabricaUsuarioPorPapel() {
    return new UsuarioPorPapelUseCase(new DashboardRepository())
}