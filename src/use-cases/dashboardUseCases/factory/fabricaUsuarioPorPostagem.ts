import { DashboardRepository } from "../../../repositories/pg/dashboard.repository";
import { UsuarioPorPostagemUseCase } from "../usuarioPorPostagem";

export async function fabricaUsuarioPorPostagem() {
    return new UsuarioPorPostagemUseCase(new DashboardRepository())
}