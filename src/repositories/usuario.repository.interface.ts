import type { IUsuario, IUsuarioModificacao } from "../entities/models/usuario.interface";

export interface IUsuarioRepository {
    criarUsuario(usuario: IUsuario): Promise<IUsuario | null>;
    deletarUsuario(id: number): Promise<IUsuario | null>;
    buscarTodosUsuarios(): Promise<IUsuario[]>;
    buscarUsuarioPorID(id: number): Promise<IUsuario | null>;
    buscarUsuarioPorEmail(email: string): Promise<IUsuario | null>;
    editarUsuario(id: number, usuario: IUsuarioModificacao): Promise<IUsuarioModificacao | null>;
}