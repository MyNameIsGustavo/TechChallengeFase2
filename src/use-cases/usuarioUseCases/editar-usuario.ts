import type { IUsuarioModificacao } from "../../entities/models/usuario.interface";
import type { IUsuarioRepository } from "../../repositories/usuario.repository.interface";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { uploadImagem } from "../postagemUseCases/uploadImgBB-postagem";

const envFile = process.env.NODE_ENV === 'PRODUCTION' ? '.env.prod' : '.env.local';
dotenv.config({ path: envFile });

export class EditarUsuarioUseCase {
    constructor(private usuarioRepository: IUsuarioRepository) { }

    async processar(id: number, usuario: IUsuarioModificacao, arquivo?: Express.Multer.File): Promise<IUsuarioModificacao | null> {
        if (usuario.senha) {
            const roundsSenha = Number(process.env.BCRYPT_SALT_ROUNDS);
            usuario.senha = await bcrypt.hash(usuario.senha, roundsSenha);
        } else {
            const usuarioSolicitado = await this.usuarioRepository.buscarUsuarioPorID(id);
            if (usuarioSolicitado) {
                usuario.senha = usuarioSolicitado.senha;
            }
        }
        if (arquivo) {
            usuario.caminhoImagem = await uploadImagem(arquivo);
        } else {
            usuario.caminhoImagem = null;
        }
        return this.usuarioRepository.editarUsuario(id, usuario);
    }
}