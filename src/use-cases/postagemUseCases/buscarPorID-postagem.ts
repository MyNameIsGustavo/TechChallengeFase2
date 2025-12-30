import type { IPostagemCompleta } from "../../entities/models/postagem.interface";
import type { IPostagemRepository } from "../../repositories/postagem.repository.interface";

export class BuscarPostagemPorIDUseCase {
    constructor(private postagemRepository: IPostagemRepository) { }

    async processar(id: number): Promise<IPostagemCompleta | null> {
        return this.postagemRepository.buscarPostagemPorID(id);
    }
}