import type { IPostagem } from "./models/postagem.interface";

export class Postagem implements IPostagem {
    id: number;
    dataPublicacao: Date;
    caminhoImagem: string;
    titulo: string;
    descricao: string;
    visibilidade: boolean;
    autorID: number;

    constructor(
        id: number,
        dataPublicacao: Date,
        caminhoImagem: string,
        titulo: string,
        descricao: string,
        visibilidade: boolean,
        autorID: number
    ) {
        this.id = id;
        this.dataPublicacao = dataPublicacao;
        this.caminhoImagem = caminhoImagem;
        this.titulo = titulo;
        this.descricao = descricao;
        this.visibilidade = visibilidade;
        this.autorID = autorID;
    }
}