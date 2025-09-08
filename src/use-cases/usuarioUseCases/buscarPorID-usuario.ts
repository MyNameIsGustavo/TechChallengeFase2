import type { IUsuario } from "../../entities/models/usuario.interface";
import type { IUsuarioRepository } from "../../repositories/usuario.repository.interface";

export class BuscarUsuarioPorIDUseCase {
    constructor(private usuarioRepository: IUsuarioRepository) { }

    async processar(id: number): Promise<IUsuario | null> {
        return this.usuarioRepository.buscarUsuarioPorID(id);
    }
}