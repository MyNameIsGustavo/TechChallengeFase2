import type { IUsuario } from "../entities/models/usuario.interface";

export interface IUsuarioRepository {
    criarUsuario(usuario: IUsuario): Promise<IUsuario | null>;
    deletarUsuario(id: number): Promise<IUsuario | null>
    buscarTodoUsuarios(): Promise<IUsuario[]>
    buscarUsuarioPorID(id: number): Promise<IUsuario | null>
}