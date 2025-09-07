export interface Usuario {
    id: number;
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
    papelUsuarioID: number;
    senha: string;
    dataCadastro: Date;
}