import { CurtidasRepository } from "../../../repositories/pg/curtidas.repository";
import { DeletarCurtidaUseCase } from "../deletar-curtida";

export async function fabricaDeletarCurtida() {
    return new DeletarCurtidaUseCase(new CurtidasRepository())
}