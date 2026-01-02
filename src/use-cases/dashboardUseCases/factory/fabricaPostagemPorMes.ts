import { DashboardRepository } from "../../../repositories/pg/dashboard.repository";
import { PostagemPorMesUseCase } from "../postagemPorMes";

export async function fabricaPostagemPorMes() {
    return new PostagemPorMesUseCase(new DashboardRepository())
}