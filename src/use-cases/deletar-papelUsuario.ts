import type { IPapelUsuario } from "../entities/models/papelUsuario.interface";
import type { IPapelUsuarioRepository } from "../repositories/papelUsuario.repository.interface";

export class DeletarPapelUsuarioUseCase {
    constructor(private papelUsuarioRepository: IPapelUsuarioRepository) { }

    async processar(id: number): Promise<IPapelUsuario | null> {
        return this.papelUsuarioRepository.deletarPapelUsuario(id);
    }
}