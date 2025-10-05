import type { IPostagem } from "../../entities/models/postagem.interface";
import type { IPostagemRepository } from "../../repositories/postagem.repository.interface";
import { uploadImagem } from "./uploadImgBB-postagem";

export class CriarPostagemUseCase {
    constructor(private postagemRepository: IPostagemRepository) { }

    async processar(postagem: IPostagem, arquivo?: Express.Multer.File): Promise<IPostagem | null> {
        let caminhoImagem = "";

        if (arquivo) {
            caminhoImagem = await uploadImagem(arquivo);
        }

        return this.postagemRepository.criarPostagem({
            ...postagem,
            caminhoImagem
        });
    }
}