import type { IUsuario } from "../../entities/models/usuario.interface";
import type { IUsuarioRepository } from "../../repositories/usuario.repository.interface";

export class BuscarTodosUsuariosUseCase {
    constructor(private usuarioRepository: IUsuarioRepository) { }

    async processar(): Promise<IUsuario[]> {
        return this.usuarioRepository.buscarTodoUsuarios();
    }
}