import type { IPostagem } from "../entities/models/postagem.interface";

export interface IPostagemRepository {
    criarPostagem(postagem: IPostagem): Promise<IPostagem | null>;
    deletarPostagem(id: number): Promise<IPostagem | null>;
}