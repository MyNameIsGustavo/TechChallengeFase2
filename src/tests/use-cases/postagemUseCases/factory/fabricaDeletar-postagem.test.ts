import { fabricaDeletarPostagem } from "../../../../use-cases/postagemUseCases/factory/fabricaDeleta-postagem";
import { DeletarPostagemUseCase } from "../../../../use-cases/postagemUseCases/deletar-postagem";
import { PostagemRepository } from "../../../../repositories/pg/postagem.repository";

jest.mock("../../../../repositories/pg/postagem.repository");

describe("../../../../use-cases/postagemUseCases/factory/fabricaDeleta-postagem - fabricaDeletarPostagem", () => {
    it("deve retornar uma instância de CriarPostagemUseCase através de PostagemRepository", async () => {
        const useCase = await fabricaDeletarPostagem();

        expect(useCase).toBeInstanceOf(DeletarPostagemUseCase);
        expect((useCase as any).postagemRepository).toBeInstanceOf(PostagemRepository);
    });
});