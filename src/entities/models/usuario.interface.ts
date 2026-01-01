export interface IUsuario {
    id?: number;
    nomeCompleto: string;
    caminhoImagem?: string | null;
    telefone: string;
    email: string;
    papelUsuarioID: number;
    senha: string;
    dataCadastro?: Date;
}

export interface IUsuarioModificacao {
    id?: number;
    nomeCompleto: string;
    caminhoImagem?: string | null;
    telefone: string;
    email: string;
    papelUsuarioID: number;
    senha?: string | undefined;
}

export interface ILogin{
    email: string;
    senha: string;
}