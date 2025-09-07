import type { IPapelUsuario } from "../entities/models/papelUsuario.interface";
import type { IPapelUsuarioRepository } from "../repositories/papelUsuario.repository.interface";

export class CriarPapelUsuarioUseCase {
    constructor(private papelUsuarioRepository: IPapelUsuarioRepository) { }

    async processar(papel: string): Promise<IPapelUsuario | null> {
        return this.papelUsuarioRepository.criarPapelUsuario(papel)
    }
}