import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { BuscarPostagemPorPalavraChaveUseCase } from "../buscarPorChave-postagem";

export async function fabricaBuscarPorPostagemPorPalavraChave() {
    return new BuscarPostagemPorPalavraChaveUseCase(new PostagemRepository());
}