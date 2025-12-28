import { ComentarioRepository } from "../../../repositories/pg/comentarios.repository";
import { CriarComentarioUseCase } from "../criar-comentario";

export async function fabricaCriarComentario() {
    return new CriarComentarioUseCase(new ComentarioRepository())
}