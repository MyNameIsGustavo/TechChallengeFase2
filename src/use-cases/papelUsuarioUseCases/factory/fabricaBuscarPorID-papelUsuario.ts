import { PapelUsuarioRepository } from "../../../repositories/pg/papelUsuario.repository";
import { BuscarPapelUsuarioPorIDUseCase } from "../buscarPorID-papelUsuario";

export async function fabricaBuscarPorIDPapelUsuario() {
    return new BuscarPapelUsuarioPorIDUseCase(new PapelUsuarioRepository())
}