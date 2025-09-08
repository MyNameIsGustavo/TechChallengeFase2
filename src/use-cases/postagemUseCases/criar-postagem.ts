import type { IPostagem } from "../../entities/models/postagem.interface";
import type { IPostagemRepository } from "../../repositories/postagem.repository.interface";

export class CriarPostagemUseCase {
    constructor(private postagemRepository: IPostagemRepository) { }

    async processar(postagem: IPostagem): Promise<IPostagem | null> {
        return this.postagemRepository.criarPostagem(postagem);
    }
}