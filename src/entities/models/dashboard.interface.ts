export interface IUsuarioPorPapel {
    papel: string;
    total: number;
}

export interface IUsuarioPorPostagem {
    usuario: string;
    total: number;
}

export interface ICurtidasPorPostagem {
    titulo: string;
    totalCurtidas: number;
}

export interface IComentariosPorPostagem {
    titulo: string;
    totalComentarios: number;
}

export interface IPostagemPorMes {
    mes: string;
    totalPostagens: number;
}