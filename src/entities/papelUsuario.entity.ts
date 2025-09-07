import type { IPapelUsuario } from "./models/papelUsuario.interface";

export class PapelUsuario implements IPapelUsuario {
    id: number;
    papelUsuario: string;

    constructor(id: number, papel: string) {
        this.id = id;
        this.papelUsuario = papel;
    }
}