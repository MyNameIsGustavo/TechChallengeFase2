import { DashboardRepository } from "../../../repositories/pg/dashboard.repository";
import { ComentarioPorPostagemUseCase } from "../comentarioPorPostagem";

export async function fabricaComentarioPorPostagem() {
    return new ComentarioPorPostagemUseCase(new DashboardRepository())
}