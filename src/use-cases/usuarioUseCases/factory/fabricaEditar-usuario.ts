import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { EditarUsuarioUseCase } from "../../usuarioUseCases/editar-usuario";

export async function fabricaEditarUsuario() {
    return new EditarUsuarioUseCase(new UsuarioRepository());
}