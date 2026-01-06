import type { IUsuarioAlteracao, IUsuarioModificacao } from "../../entities/models/usuario.interface";
import type { IUsuarioRepository } from "../../repositories/usuario.repository.interface";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { uploadImagem } from "../postagemUseCases/uploadImgBB-postagem";

const envFile = process.env.NODE_ENV === 'PRODUCTION' ? '.env.prod' : '.env.local';
dotenv.config({ path: envFile });

export class EditarUsuarioUseCase {
    constructor(private usuarioRepository: IUsuarioRepository) { }

    async processar(id: number, usuario: IUsuarioAlteracao, arquivo?: Express.Multer.File): Promise<IUsuarioModificacao | null> {
        const usuarioAtual = await this.usuarioRepository.buscarUsuarioPorID(id);
        if (!usuarioAtual) return null;

        if (usuario.senha) {
            const roundsSenha = Number(process.env.BCRYPT_SALT_ROUNDS);
            usuario.senha = await bcrypt.hash(usuario.senha, roundsSenha);
        } else {
            usuario.senha = usuarioAtual.senha;
        }
        if (arquivo) {
            usuario.caminhoImagem = await uploadImagem(arquivo);
        } else {
            usuario.caminhoImagem = usuarioAtual.caminhoImagem ?? null;;
        }
        return this.usuarioRepository.alterarUsuario(id, usuario);
    }
}