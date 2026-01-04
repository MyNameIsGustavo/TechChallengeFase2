import type { IPostagem, IPostagemCompleta } from "../../entities/models/postagem.interface";
import type { IPostagemRepository } from "../../repositories/postagem.repository.interface";

export class BuscarPostagemPorPalavraChaveUseCase {
    constructor(private postagemRepository: IPostagemRepository) { }

    async processar(palavraChave: string, usuarioID: number): Promise<IPostagemCompleta[]> {
        return this.postagemRepository.buscarPostagensPorPalavraChave(palavraChave, usuarioID);
    }
}