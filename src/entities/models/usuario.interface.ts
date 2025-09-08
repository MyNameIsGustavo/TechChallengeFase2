export interface IUsuario {
    id?: number;
    nomeCompleto: string;
    telefone: string;
    email: string;
    papelUsuarioID: number;
    senha: string;
    dataCadastro?: Date;
}