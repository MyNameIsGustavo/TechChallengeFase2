import type { IPostagem } from "../../entities/models/postagem.interface";
import type { IPostagemRepository } from "../../repositories/postagem.repository.interface";

export class BuscarPostagemPorPalavraChaveUseCase {
    constructor(private postagemRepository: IPostagemRepository) { }

    async processar(palavraChave: string): Promise<IPostagem[]> {
        return this.postagemRepository.buscarPostagensPorPalavraChave(palavraChave);
    }
}