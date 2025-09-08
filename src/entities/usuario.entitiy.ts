import type { IUsuario } from "./models/usuario.interface";

export class Usuario implements IUsuario {
    id: number;
    nomeCompleto: string;
    telefone: string;
    email: string;
    papelUsuarioID: number;
    senha: string;
    dataCadastro?: Date;

    constructor(
        id: number,
        nomeCompleto: string,
        telefone: string,
        email: string,
        papelUsuarioID: number,
        senha: string,
        dataCadastro: Date
    ) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.telefone = telefone;
        this.email = email;
        this.papelUsuarioID = papelUsuarioID;
        this.senha = senha;
        this.dataCadastro = dataCadastro;
    }
}