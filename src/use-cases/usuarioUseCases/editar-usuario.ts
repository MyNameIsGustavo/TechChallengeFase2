import type { IUsuario } from "../../entities/models/usuario.interface";
import type { IUsuarioRepository } from "../../repositories/usuario.repository.interface";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export class EditarUsuarioUseCase {
    constructor(private usuarioRepository: IUsuarioRepository) { }

    async processar(id: number, usuario: IUsuario): Promise<IUsuario | null> {
        if (usuario.senha) {
            const roundsSenha = Number(process.env.BCRYPT_SALT_ROUNDS);
            usuario.senha = await bcrypt.hash(usuario.senha, roundsSenha);
        } else {
            const usuarioSolicitado = await this.usuarioRepository.buscarUsuarioPorID(id);
            if (usuarioSolicitado) {
                usuario.senha = usuarioSolicitado.senha;
            }
        }
        return this.usuarioRepository.editarUsuario(id, usuario);
    }
}