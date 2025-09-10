import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { BuscarPostagemPorIDUseCase } from "../../postagemUseCases/buscarPorID-postagem";

export async function fabricaBuscarPorIDPostagem() {
    return new BuscarPostagemPorIDUseCase(new PostagemRepository());
}