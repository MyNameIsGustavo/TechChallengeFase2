import { fabricaLoginUsuarios } from "../../../../use-cases/usuarioUseCases/factory/fabricaLogin-usuario";
import { LoginUsuarioUseCase } from "../../../../use-cases/usuarioUseCases/login-usuario";
import { UsuarioRepository } from "../../../../repositories/pg/usuario.repository";

jest.mock("../../../../repositories/pg/usuario.repository");

describe("../../../../use-cases/usuarioUseCases/factory/fabricaLogin-usuario - fabricaLoginUsuarios", () => {
    it("deve retornar uma instância de LoginUsuarioUseCase através de UsuarioRepository", async () => {
        const useCase = await fabricaLoginUsuarios();

        expect(useCase).toBeInstanceOf(LoginUsuarioUseCase);
        expect((useCase as any).usuarioRepository).toBeInstanceOf(UsuarioRepository);
    });
});