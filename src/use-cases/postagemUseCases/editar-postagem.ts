import type { IPostagem, IPostagemModificacao } from "../../entities/models/postagem.interface";
import type { IPostagemRepository } from "../../repositories/postagem.repository.interface";

export class EditarPostagemUseCase {
    constructor(private postagemRepository: IPostagemRepository) { }

    async processar(id: number, postagem: IPostagemModificacao): Promise<IPostagemModificacao | null> {
        return this.postagemRepository.editarPostagem(id, postagem);
    }
}