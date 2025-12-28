import { CurtidasRepository } from "../../../repositories/pg/curtidas.repository";
import { CriarCurtidaUseCase } from "../criar-curtida";

export async function fabricaCriarCurtida() {
    return new CriarCurtidaUseCase(new CurtidasRepository())
}