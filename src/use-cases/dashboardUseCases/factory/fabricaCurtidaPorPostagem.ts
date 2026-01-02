import { DashboardRepository } from "../../../repositories/pg/dashboard.repository";
import { CurtidaPorPostagemUseCase } from "../curtidaPorPostagem";

export async function fabricaCurtidasPorPostagem() {
    return new CurtidaPorPostagemUseCase(new DashboardRepository())
}