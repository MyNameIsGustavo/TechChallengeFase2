import type { IPostagem, IPostagemCompleta, IPostagemModificacao } from "../entities/models/postagem.interface";

export interface IPostagemRepository {
    criarPostagem(postagem: IPostagem): Promise<IPostagem | null>;
    deletarPostagem(id: number): Promise<IPostagem | null>;
    buscarTodasPostagens(): Promise<IPostagemCompleta[]>;
    buscarPostagemPorID(id: number): Promise<IPostagemCompleta | null>;
    editarPostagem(id: number, postagem: IPostagemModificacao): Promise<IPostagemModificacao | null>
    buscarPostagensPorPalavraChave(palavraChave: string): Promise<IPostagem[]>
}