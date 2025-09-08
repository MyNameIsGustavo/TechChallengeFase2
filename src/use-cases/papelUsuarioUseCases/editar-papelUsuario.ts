import type { IPapelUsuario } from "../../entities/models/papelUsuario.interface";
import type { IPapelUsuarioRepository } from "../../repositories/papelUsuario.repository.interface";

export class EditarPapelUsuarioUseCase {
    constructor(private papelUsuarioRepository: IPapelUsuarioRepository) { }

    async processar(id: number, papelUsuario: string): Promise<IPapelUsuario | null> {
        return this.papelUsuarioRepository.editarPapelUsuario(id, papelUsuario);
    }
}