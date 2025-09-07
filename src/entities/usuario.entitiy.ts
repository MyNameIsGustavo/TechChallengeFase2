import type { IUsuario } from "./models/usuario.interface";

export class Usuario implements IUsuario {
    id: number;
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
    papelUsuarioID: number;
    senha: string;
    dataCadastro: Date;

    constructor(
        id: number,
        nome: string,
        sobrenome: string,
        telefone: string,
        email: string,
        papelUsuarioID: number,
        senha: string,
        dataCadastro: Date
    ) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.telefone = telefone;
        this.email = email;
        this.papelUsuarioID = papelUsuarioID;
        this.senha = senha;
        this.dataCadastro = dataCadastro;
    }
}