import { fabricaBuscarPorIDUsuario } from "../../../../use-cases/usuarioUseCases/factory/fabricaBuscarPorID-usuario";
import { BuscarUsuarioPorIDUseCase } from "../../../../use-cases/usuarioUseCases/buscarPorID-usuario";
import { UsuarioRepository } from "../../../../repositories/pg/usuario.repository";

jest.mock("../../../../repositories/pg/usuario.repository");

describe("../../../../use-cases/usuarioUseCases/factory/fabricaBuscarPorID-usuario - fabricaBuscarPorIDUsuario", () => {
    it("deve retornar uma instância de BuscarUsuarioPorIDUseCase através de UsuarioRepository", async () => {
        const useCase = await fabricaBuscarPorIDUsuario();

        expect(useCase).toBeInstanceOf(BuscarUsuarioPorIDUseCase);
        expect((useCase as any).usuarioRepository).toBeInstanceOf(UsuarioRepository);
    });
});