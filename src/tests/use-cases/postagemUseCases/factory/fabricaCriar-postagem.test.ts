import { fabricaCriarPostagem } from "../../../../use-cases/postagemUseCases/factory/fabricaCria-postagem";
import { CriarPostagemUseCase } from "../../../../use-cases/postagemUseCases/criar-postagem";
import { PostagemRepository } from "../../../../repositories/pg/postagem.repository";

jest.mock("../../../../repositories/pg/postagem.repository");

describe("../../../../use-cases/postagemUseCases/factory/fabricaCria-postagem - fabricaCriarPostagem", () => {
    it("deve retornar uma instância de CriarPostagemUseCase através de PostagemRepository", async () => {
        const useCase = await fabricaCriarPostagem();

        expect(useCase).toBeInstanceOf(CriarPostagemUseCase);
        expect((useCase as any).postagemRepository).toBeInstanceOf(PostagemRepository);
    });
});