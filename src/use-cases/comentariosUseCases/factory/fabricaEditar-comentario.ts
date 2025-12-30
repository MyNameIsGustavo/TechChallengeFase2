import { ComentarioRepository } from "../../../repositories/pg/comentarios.repository";
import { EditarComentarioUseCase } from "../editar-comentario";

export async function fabricaEditarComentario() {
    return new EditarComentarioUseCase(new ComentarioRepository())
}