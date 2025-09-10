import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { CriarUsuarioUseCase } from "../../usuarioUseCases/criar-usuario";

export async function fabricaCriarUsuarios() {
    return new CriarUsuarioUseCase(new UsuarioRepository());
}