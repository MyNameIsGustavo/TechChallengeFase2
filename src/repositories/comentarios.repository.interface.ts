import type { IComentario } from "../entities/models/comentario.interface";

export interface IComentarioRepository {
    criarComentario(idUsuario: number, postagemID: number, conteudo: string): Promise<IComentario | null>;
    deletarComentario(postagemID: number, idComentario: number): Promise<IComentario | null>;
}