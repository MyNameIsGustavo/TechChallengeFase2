import { ComentarioRepository } from "../../../repositories/pg/comentarios.repository";
import { DeletarComentarioUseCase } from "../deletar-comentario";

export async function fabricaDeletaComentario() {
    return new DeletarComentarioUseCase(new ComentarioRepository())
}