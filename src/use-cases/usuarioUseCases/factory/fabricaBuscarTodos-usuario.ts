import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { BuscarTodosUsuariosUseCase } from "../../usuarioUseCases/buscarTodos-usuario";

export async function fabricaBuscarTodosUsuarios() {
    return new BuscarTodosUsuariosUseCase(new UsuarioRepository());
}