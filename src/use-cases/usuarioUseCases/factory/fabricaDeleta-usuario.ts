import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { DeletarUsuarioUseCase } from "../../usuarioUseCases/deletar-usuario";

export async function fabricaDeletarUsuarios() {
    return new DeletarUsuarioUseCase(new UsuarioRepository());
}