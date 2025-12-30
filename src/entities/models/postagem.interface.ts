export interface IPostagem {
    id?: number;
    dataPublicacao?: Date;
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

export interface IPostagemCompleta {
    id: number;
    titulo: string;
    descricao: string;
    visibilidade: boolean;
    dataPublicacao: Date;
    caminhoImagem: string;

    autor: {
        id: number;
        nomeCompleto: string;
    };

    estatisticas: {
        totalCurtidas: number;
        totalComentarios: number;
    };

    curtidas: {
        id: number;
        nomeCompleto: string;
    }[];

    comentarios: {
        id: number;
        conteudo: string;
        dataCriacao: Date;
        usuario: {
            id: number;
            nomeCompleto: string;
            email: string;
        };
    }[];
}
