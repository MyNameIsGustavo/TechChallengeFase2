import { ComentarioRepository } from "../../../repositories/pg/comentarios.repository";
import { BuscarComentarioPorIDUseCase } from "../buscarPorID-comentario";

export async function fabricaBuscarComentarioPorID() {
    return new BuscarComentarioPorIDUseCase(new ComentarioRepository())
}