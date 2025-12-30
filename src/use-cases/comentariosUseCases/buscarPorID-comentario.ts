import type { IComentario } from "../../entities/models/comentario.interface";
import type { IComentarioRepository } from "../../repositories/comentarios.repository.interface";

export class BuscarComentarioPorIDUseCase {
    constructor(private comentarioRepository: IComentarioRepository) { }

    async processar(postagemID: number, comentarioID: number): Promise<IComentario | null> {
        return this.comentarioRepository.listarComentarioPorID(Number(postagemID), Number(comentarioID));
    }
}