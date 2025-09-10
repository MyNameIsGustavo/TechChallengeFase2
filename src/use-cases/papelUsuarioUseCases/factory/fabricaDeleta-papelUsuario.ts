import { PapelUsuarioRepository } from "../../../repositories/pg/papelUsuario.repository";
import { DeletarPapelUsuarioUseCase } from "../deletar-papelUsuario";

export async function fabricaDeletaPapelUsuario() {
    return new DeletarPapelUsuarioUseCase(new PapelUsuarioRepository())
}