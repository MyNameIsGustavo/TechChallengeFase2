import { fabricaEditarPapelUsuario } from "../../../../use-cases/papelUsuarioUseCases/factory/fabricaEditar-papelUsuario";
import { EditarPapelUsuarioUseCase } from "../../../../use-cases/papelUsuarioUseCases/editar-papelUsuario";
import { PapelUsuarioRepository } from "../../../../repositories/pg/papelUsuario.repository";

jest.mock("../../../../repositories/pg/papelUsuario.repository");

describe("../../../../use-cases/papelUsuarioUseCases/factory/fabricaEditar-papelUsuario - fabricaEditarPapelUsuario", () => {

    it("deve retornar uma instância de DeletarPapelUsuarioUseCase através de PapelUsuarioRepository", async () => {
        const useCase = await fabricaEditarPapelUsuario();

        expect(useCase).toBeInstanceOf(EditarPapelUsuarioUseCase);
        expect((useCase as any).papelUsuarioRepository).toBeInstanceOf(PapelUsuarioRepository);
    });
});