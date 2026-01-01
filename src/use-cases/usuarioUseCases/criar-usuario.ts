import type { IUsuario } from "../../entities/models/usuario.interface";
import type { IUsuarioRepository } from "../../repositories/usuario.repository.interface";
import { uploadImagem } from "../postagemUseCases/uploadImgBB-postagem";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'PRODUCTION' ? '.env.prod' : '.env.local';
dotenv.config({ path: envFile });

export class CriarUsuarioUseCase {
    constructor(private usuarioRepository: IUsuarioRepository) { }

    async processar(usuario: IUsuario, arquivo?: Express.Multer.File): Promise<IUsuario | null> {
        const roundsSenha = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
        usuario.senha = await bcrypt.hash(usuario.senha, roundsSenha);

        if (arquivo) {
            usuario.caminhoImagem = await uploadImagem(arquivo);
        } else {
            usuario.caminhoImagem = null;
        }
        return this.usuarioRepository.criarUsuario(usuario);
    }
}
