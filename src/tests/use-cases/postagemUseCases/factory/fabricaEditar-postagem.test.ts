import { fabricaEditarPostagem } from "../../../../use-cases/postagemUseCases/factory/fabricaEditar-postagem";
import { EditarPostagemUseCase } from "../../../../use-cases/postagemUseCases/editar-postagem";
import { PostagemRepository } from "../../../../repositories/pg/postagem.repository";

jest.mock("../../../../repositories/pg/postagem.repository");

describe("../../../../use-cases/postagemUseCases/factory/fabricaEditar-postagem - fabricaEditarPostagem", () => {
    it("deve retornar uma instância de EditarPostagemUseCase através de PostagemRepository", async () => {
        const useCase = await fabricaEditarPostagem();

        expect(useCase).toBeInstanceOf(EditarPostagemUseCase);
        expect((useCase as any).postagemRepository).toBeInstanceOf(PostagemRepository);
    });
});