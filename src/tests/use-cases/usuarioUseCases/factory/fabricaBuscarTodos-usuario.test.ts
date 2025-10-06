import { fabricaBuscarTodosUsuarios } from "../../../../use-cases/usuarioUseCases/factory/fabricaBuscarTodos-usuario";
import { BuscarTodosUsuariosUseCase } from "../../../../use-cases/usuarioUseCases/buscarTodos-usuario";
import { UsuarioRepository } from "../../../../repositories/pg/usuario.repository";

jest.mock("../../../../repositories/pg/usuario.repository");

describe("../../../../use-cases/usuarioUseCases/factory/fabricaBuscarTodos-usuario - fabricaBuscarTodosUsuarios", () => {
    it("deve retornar uma instância de BuscarTodosUsuariosUseCase através de UsuarioRepository", async () => {
        const useCase = await fabricaBuscarTodosUsuarios();

        expect(useCase).toBeInstanceOf(BuscarTodosUsuariosUseCase);
        expect((useCase as any).usuarioRepository).toBeInstanceOf(UsuarioRepository);
    });
});