import { PapelUsuarioRepository } from "../../../repositories/pg/papelUsuario.repository";
import { BuscarTodosPapeisUsuariosUseCase } from "../buscarTodos-papelUsuario";

export async function fabricaBuscarTodosPapelUsuario() {
    return new BuscarTodosPapeisUsuariosUseCase(new PapelUsuarioRepository())
}