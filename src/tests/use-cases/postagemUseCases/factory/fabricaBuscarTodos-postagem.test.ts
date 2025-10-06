import { fabricaBuscarTodosPostagem } from "../../../../use-cases/postagemUseCases/factory/fabricaBuscarTodos-postagem";
import { BuscarTodasPostagensUseCase } from "../../../../use-cases/postagemUseCases/buscarTodos-postagem";
import { PostagemRepository } from "../../../../repositories/pg/postagem.repository";

jest.mock("../../../../repositories/pg/postagem.repository");

describe("../../../../use-cases/postagemUseCases/factory/fabricaBuscarTodos-postagem - fabricaBuscarTodosPostagem", () => {
    it("deve retornar uma instância de BuscarTodasPostagensUseCase através de PostagemRepository", async () => {
        const useCase = await fabricaBuscarTodosPostagem();

        expect(useCase).toBeInstanceOf(BuscarTodasPostagensUseCase);
        expect((useCase as any).postagemRepository).toBeInstanceOf(PostagemRepository);
    });
});