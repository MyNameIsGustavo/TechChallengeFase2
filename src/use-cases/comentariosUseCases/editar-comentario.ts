import type { IComentario } from "../../entities/models/comentario.interface";
import type { IComentarioRepository } from "../../repositories/comentarios.repository.interface";

export class EditarComentarioUseCase {
    constructor(private comentarioRepository: IComentarioRepository) { }

    async processar(postagemID: number, idComentario: number, conteudo: string): Promise<IComentario | null> {
        return this.comentarioRepository.editarComentario(postagemID, idComentario, conteudo)
    }
}