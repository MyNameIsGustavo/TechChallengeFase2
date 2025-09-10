import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { CriarPostagemUseCase } from "../../postagemUseCases/criar-postagem";

export async function fabricaCriarPostagem() {
    return new CriarPostagemUseCase(new PostagemRepository());
}