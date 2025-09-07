import type { IPapelUsuario } from "../entities/models/papelUsuario.interface";

export interface IPapelUsuarioRepository {
    criarPapelUsuario(papel: string): Promise<IPapelUsuario | null>;
    deletarPapelUsuario(id: number): Promise<IPapelUsuario | null>;
    buscarPapelUsuarioPorID(id: number): Promise<IPapelUsuario | null>;
    buscarTodosPapeisUsuarios(): Promise<IPapelUsuario[]>;
    editarPapelUsuario(id: number, papel: string): Promise<IPapelUsuario | null>
}