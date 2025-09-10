import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { DeletarPostagemUseCase } from "../../postagemUseCases/deletar-postagem";

export async function fabricaDeletarPostagem() {
    return new DeletarPostagemUseCase(new PostagemRepository());
}