import type { IPostagem } from "../../entities/models/postagem.interface";
import type { IPostagemRepository } from "../../repositories/postagem.repository.interface";

export class BuscarTodasPostagensUseCase {
    constructor(private postagemRepository: IPostagemRepository) { }

    async processar(): Promise<IPostagem[]> {
        return this.postagemRepository.buscarTodasPostagens();
    }
}