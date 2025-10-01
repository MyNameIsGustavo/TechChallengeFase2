import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { BuscarPostagemPorPalavraChaveUseCase } from "../../postagemUseCases/buscarPorChave-postagem";

export async function fabricaBuscarPorPostagemPorPalavraChave() {
    return new BuscarPostagemPorPalavraChaveUseCase(new PostagemRepository());
}