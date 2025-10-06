import { fabricaBuscarPorIDPostagem } from "../../../../use-cases/postagemUseCases/factory/fabricaBuscarPorID-postagem";
import { BuscarPostagemPorIDUseCase } from "../../../../use-cases/postagemUseCases/buscarPorID-postagem";
import { PostagemRepository } from "../../../../repositories/pg/postagem.repository";

jest.mock("../../../../repositories/pg/postagem.repository");

describe("../../../../use-cases/postagemUseCases/factory/fabricaBuscarPorID-postagem - fabricaBuscarPorIDPostagem", () => {
    it("deve retornar uma instância de BuscarPostagemPorIDUseCase através de PostagemRepository", async () => {
        const useCase = await fabricaBuscarPorIDPostagem();

        expect(useCase).toBeInstanceOf(BuscarPostagemPorIDUseCase);
        expect((useCase as any).postagemRepository).toBeInstanceOf(PostagemRepository);
    });
});