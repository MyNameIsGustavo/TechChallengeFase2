import type { IComentario } from "../../entities/models/comentario.interface";
import type { IComentarioRepository } from "../../repositories/comentarios.repository.interface";

export class DeletarComentarioUseCase {
    constructor(private comentarioRepository: IComentarioRepository) { }

    async processar(postagemID: number, idComentario: number): Promise<IComentario | null> {
        return this.comentarioRepository.deletarComentario(postagemID, idComentario)
    }
}