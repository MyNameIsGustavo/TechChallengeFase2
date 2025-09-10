import type { IPapelUsuario } from "../../entities/models/papelUsuario.interface";
import type { IPapelUsuarioRepository } from "../../repositories/papelUsuario.repository.interface";

export class BuscarTodosPapeisUsuariosUseCase {
    constructor(private papelUsuarioRepository: IPapelUsuarioRepository) { }

    async processar(): Promise<IPapelUsuario[]> {
        return this.papelUsuarioRepository.buscarTodosPapeisUsuarios();
    }
}