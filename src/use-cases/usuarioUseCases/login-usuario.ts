import type { ILogin } from "../../entities/models/usuario.interface";
import type { IUsuarioRepository } from "../../repositories/usuario.repository.interface";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

export class LoginUsuarioUseCase {
    constructor(private usuarioRepository: IUsuarioRepository) { }

    async processar(dadosLogin: ILogin): Promise<string | false> {
        const usuarioSolicitado = await this.usuarioRepository.buscarUsuarioPorEmail(dadosLogin.email);
        if (!usuarioSolicitado) return false;

        const senhaConfere = await bcrypt.compare(dadosLogin.senha, usuarioSolicitado.senha);
        if (!senhaConfere) return false;

        const jsonWebToken = jwt.sign(
            { id: usuarioSolicitado.id, email: usuarioSolicitado.email, papelUsuario: usuarioSolicitado.papelUsuarioID, },
            process.env.SECRET_KEY as string, { expiresIn: "1h" });

        return jsonWebToken;
    }
}