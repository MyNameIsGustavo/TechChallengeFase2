import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { EditarPostagemUseCase } from "../../postagemUseCases/editar-postagem";

export async function fabricaDeletarPostagem() {
    return new EditarPostagemUseCase(new PostagemRepository());
}