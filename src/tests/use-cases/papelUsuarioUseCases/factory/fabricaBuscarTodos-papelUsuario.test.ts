import { fabricaBuscarTodosPapelUsuario } from "../../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarTodos-papelUsuario";
import { BuscarTodosPapeisUsuariosUseCase } from "../../../../use-cases/papelUsuarioUseCases/buscarTodos-papelUsuario";
import { PapelUsuarioRepository } from "../../../../repositories/pg/papelUsuario.repository";

jest.mock("../../../../repositories/pg/papelUsuario.repository");

describe("../../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarTodos-papelUsuario - fabricaBuscarTodosPapelUsuario", () => {

    it("deve retornar uma instância de BuscarTodosPapeisUsuariosUseCase através de PapelUsuarioRepository", async () => {
        const useCase = await fabricaBuscarTodosPapelUsuario();

        expect(useCase).toBeInstanceOf(BuscarTodosPapeisUsuariosUseCase);
        expect((useCase as any).papelUsuarioRepository).toBeInstanceOf(PapelUsuarioRepository);
    });
});