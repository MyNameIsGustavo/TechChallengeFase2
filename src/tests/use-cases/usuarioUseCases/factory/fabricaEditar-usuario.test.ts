import { fabricaEditarUsuario } from "../../../../use-cases/usuarioUseCases/factory/fabricaEditar-usuario";
import { EditarUsuarioUseCase } from "../../../../use-cases/usuarioUseCases/editar-usuario";
import { UsuarioRepository } from "../../../../repositories/pg/usuario.repository";

jest.mock("../../../../repositories/pg/usuario.repository");

describe("../../../../use-cases/usuarioUseCases/factory/fabricaEditar-usuario - fabricaEditarUsuario", () => {
    it("deve retornar uma instância de EditarUsuarioUseCase através de UsuarioRepository", async () => {
        const useCase = await fabricaEditarUsuario();

        expect(useCase).toBeInstanceOf(EditarUsuarioUseCase);
        expect((useCase as any).usuarioRepository).toBeInstanceOf(UsuarioRepository);
    });
});