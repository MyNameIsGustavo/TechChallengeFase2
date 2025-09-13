import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { LoginUsuarioUseCase } from "../login-usuario";

export async function fabricaLoginUsuarios() {
    return new LoginUsuarioUseCase(new UsuarioRepository());
}