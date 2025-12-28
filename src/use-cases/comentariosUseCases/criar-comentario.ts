import type { IComentario } from "../../entities/models/comentario.interface";
import type { IComentarioRepository } from "../../repositories/comentarios.repository.interface";

export class CriarComentarioUseCase {
    constructor(private comentarioRepository: IComentarioRepository) { }

    async processar(usuarioID: number, postagemID: number, conteudo: string): Promise<IComentario | null> {
        return this.comentarioRepository.criarComentario(usuarioID, postagemID, conteudo)
    }
}