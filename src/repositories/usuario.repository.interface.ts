import type { IUsuario, IUsuarioAlteracao, IUsuarioModificacao } from "../entities/models/usuario.interface";

export interface IUsuarioRepository {
    criarUsuario(usuario: IUsuario): Promise<IUsuario | null>;
    deletarUsuario(id: number): Promise<IUsuario | null>;
    buscarTodosUsuarios(pagina?: number, limite?: number, tipoUsuario?: number): Promise<IUsuario[]>;
    buscarUsuarioPorID(id: number): Promise<IUsuario | null>;
    buscarUsuarioPorEmail(email: string): Promise<IUsuario | null>;
    editarUsuario(id: number, usuario: IUsuarioModificacao): Promise<IUsuarioModificacao | null>;
    alterarUsuario(id: number, usuario: IUsuarioAlteracao): Promise<IUsuarioModificacao | null>;
}