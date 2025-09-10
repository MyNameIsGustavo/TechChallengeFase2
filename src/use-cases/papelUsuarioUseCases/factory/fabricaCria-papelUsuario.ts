import { PapelUsuarioRepository } from "../../../repositories/pg/papelUsuario.repository";
import { CriarPapelUsuarioUseCase } from "../criar-papelUsuario";

export async function fabricaCriaPapelUsuario() {
    return new CriarPapelUsuarioUseCase(new PapelUsuarioRepository())
}