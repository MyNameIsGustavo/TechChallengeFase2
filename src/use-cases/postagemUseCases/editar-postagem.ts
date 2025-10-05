import type { IPostagemModificacao } from "../../entities/models/postagem.interface";
import type { IPostagemRepository } from "../../repositories/postagem.repository.interface";
import { uploadImagem } from "./uploadImgBB-postagem";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "PRODUCTION" ? ".env.prod" : ".env.local";
dotenv.config({ path: envFile });

export class EditarPostagemUseCase {
    constructor(private postagemRepository: IPostagemRepository) { }

    async processar(
        id: number,
        postagem: IPostagemModificacao,
        arquivo?: Express.Multer.File
    ): Promise<IPostagemModificacao | null> {

        const postagemExistente = await this.postagemRepository.buscarPostagemPorID(id);
        if (!postagemExistente) return null;

        if (arquivo) {
            postagem.caminhoImagem = await uploadImagem(arquivo);
        }

        return this.postagemRepository.editarPostagem(id, postagem);
    }
}