import type { IPapelUsuario } from "../../entities/models/papelUsuario.interface";
import type { IPapelUsuarioRepository } from "../../repositories/papelUsuario.repository.interface";

export class BuscarPapelUsuarioPorIDUseCase {
    constructor(private papelUsuarioRepository: IPapelUsuarioRepository) { }

    async processar(id: number): Promise<IPapelUsuario | null> {
        return this.papelUsuarioRepository.buscarPapelUsuarioPorID(id);
    }
}