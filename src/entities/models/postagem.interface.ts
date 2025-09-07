export interface IPostagem {
    id?: number;
    dataPublicacao: Date;
    imagem: string;
    titulo: string;
    descricao: string;
    visibilidade: boolean;
    autorID: number;
}