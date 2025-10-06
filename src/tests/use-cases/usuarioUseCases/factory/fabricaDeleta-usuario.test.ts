import { fabricaDeletarUsuarios } from "../../../../use-cases/usuarioUseCases/factory/fabricaDeleta-usuario";
import { DeletarUsuarioUseCase } from "../../../../use-cases/usuarioUseCases/deletar-usuario";
import { UsuarioRepository } from "../../../../repositories/pg/usuario.repository";

jest.mock("../../../../repositories/pg/usuario.repository");

describe("../../../../use-cases/usuarioUseCases/factory/fabricaDeleta-usuario - fabricaDeletarUsuarios", () => {
    it("deve retornar uma instância de DeletarUsuarioUseCase através de UsuarioRepository", async () => {
        const useCase = await fabricaDeletarUsuarios();

        expect(useCase).toBeInstanceOf(DeletarUsuarioUseCase);
        expect((useCase as any).usuarioRepository).toBeInstanceOf(UsuarioRepository);
    });
});