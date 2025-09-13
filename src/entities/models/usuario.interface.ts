export interface IUsuario {
    id?: number;
    nomeCompleto: string;
    telefone: string;
    email: string;
    papelUsuarioID: number;
    senha: string;
    dataCadastro?: Date;
}

export interface IUsuarioModificacao {
    id?: number;
    nomeCompleto: string;
    telefone: string;
    email: string;
    papelUsuarioID: number;
    senha: string;
}

export interface ILogin{
    email: string;
    senha: string;
}