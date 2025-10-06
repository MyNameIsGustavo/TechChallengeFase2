import { fabricaCriarUsuarios } from "../../../../use-cases/usuarioUseCases/factory/fabricaCria-usuario";
import { CriarUsuarioUseCase } from "../../../../use-cases/usuarioUseCases/criar-usuario";
import { UsuarioRepository } from "../../../../repositories/pg/usuario.repository";

jest.mock("../../../../repositories/pg/usuario.repository");

describe("../../../../use-cases/usuarioUseCases/factory/fabricaCria-usuario - fabricaCriarUsuarios", () => {
    it("deve retornar uma instância de CriarUsuarioUseCase através de UsuarioRepository", async () => {
        const useCase = await fabricaCriarUsuarios();

        expect(useCase).toBeInstanceOf(CriarUsuarioUseCase);
        expect((useCase as any).usuarioRepository).toBeInstanceOf(UsuarioRepository);
    });
});