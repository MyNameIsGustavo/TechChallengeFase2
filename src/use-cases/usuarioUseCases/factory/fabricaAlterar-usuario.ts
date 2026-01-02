import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { AlterarUsuarioUseCase } from "../../usuarioUseCases/alterar-usuario";

export async function fabricaAlterarUsuario() {
    return new AlterarUsuarioUseCase(new UsuarioRepository());
}