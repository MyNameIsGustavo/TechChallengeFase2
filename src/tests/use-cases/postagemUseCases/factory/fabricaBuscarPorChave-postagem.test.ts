import { fabricaBuscarPorPostagemPorPalavraChave } from "../../../../use-cases/postagemUseCases/factory/fabricaBuscarPorChave-postagem";
import { BuscarPostagemPorPalavraChaveUseCase } from "../../../../use-cases/postagemUseCases/buscarPorChave-postagem";
import { PostagemRepository } from "../../../../repositories/pg/postagem.repository";

jest.mock("../../../../repositories/pg/postagem.repository");

describe("../../../../use-cases/postagemUseCases/factory/fabricaBuscarPorChave-postagem - fabricaBuscarPorChave-postagem", () => {
    it("deve retornar uma instância de BuscarPostagemPorPalavraChaveUseCase através de PostagemRepository", async () => {
        const useCase = await fabricaBuscarPorPostagemPorPalavraChave();

        expect(useCase).toBeInstanceOf(BuscarPostagemPorPalavraChaveUseCase);
        expect((useCase as any).postagemRepository).toBeInstanceOf(PostagemRepository);
    });
});