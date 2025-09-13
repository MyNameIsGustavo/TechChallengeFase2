export interface IPostagem {
    id?: number;
    dataPublicacao: Date;
    caminhoImagem: string;
    titulo: string;
    descricao: string;
    visibilidade: boolean;
    autorID: number;
}

export interface IPostagemModificacao {
    id?: number;
    caminhoImagem: string;
    titulo: string;
    descricao: string;
    visibilidade: boolean;
}