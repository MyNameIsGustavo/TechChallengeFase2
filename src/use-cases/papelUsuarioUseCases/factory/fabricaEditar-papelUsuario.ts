import { PapelUsuarioRepository } from "../../../repositories/pg/papelUsuario.repository";
import { EditarPapelUsuarioUseCase } from "../editar-papelUsuario";

export async function fabricaEditarPapelUsuario() {
    return new EditarPapelUsuarioUseCase(new PapelUsuarioRepository())
}