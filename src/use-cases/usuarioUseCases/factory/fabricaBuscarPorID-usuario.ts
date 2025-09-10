import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { BuscarUsuarioPorIDUseCase } from "../../usuarioUseCases/buscarPorID-usuario";

export async function fabricaBuscarPorIDUsuario() {
    return new BuscarUsuarioPorIDUseCase(new UsuarioRepository());
}