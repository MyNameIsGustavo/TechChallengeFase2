import type { IPostagem } from "../../entities/models/postagem.interface";
import type { IPostagemRepository } from "../../repositories/postagem.repository.interface";

export class DeletarPostagemUseCase {
    constructor(private postagemRepository: IPostagemRepository) { }

    async processar(id: number): Promise<IPostagem | null> {
        return this.postagemRepository.deletarPostagem(id);
    }
}