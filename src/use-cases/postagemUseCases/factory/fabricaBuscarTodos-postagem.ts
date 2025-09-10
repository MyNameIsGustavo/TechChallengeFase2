import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { BuscarTodasPostagensUseCase } from "../../postagemUseCases/buscarTodos-postagem";

export async function fabricaBuscarTodosPostagem() {
    return new BuscarTodasPostagensUseCase(new PostagemRepository());
}