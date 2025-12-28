import type { ICurtidas } from "../../entities/models/curtidas.interface";
import type { ICurtidasRepository } from "../../repositories/curtidas.repository.interface";

export class CriarCurtidaUseCase {
    constructor(private curtidaRepository: ICurtidasRepository) { }

    async processar(usuarioID: number, postagemID: number): Promise<boolean> {
        return this.curtidaRepository.curtir(usuarioID, postagemID)
    }
}