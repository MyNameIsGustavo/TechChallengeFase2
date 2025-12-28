import type { ICurtidasRepository } from "../../repositories/curtidas.repository.interface";

export class DeletarCurtidaUseCase {
    constructor(private curtidaRepository: ICurtidasRepository) { }

    async processar(usuarioID: number, postagemID: number): Promise<boolean> {
        return this.curtidaRepository.descurtir(usuarioID, postagemID)
    }
}