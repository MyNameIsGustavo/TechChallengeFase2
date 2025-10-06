import { fabricaBuscarPorIDPapelUsuario } from "../../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarPorID-papelUsuario";
import { BuscarPapelUsuarioPorIDUseCase } from "../../../../use-cases/papelUsuarioUseCases/buscarPorID-papelUsuario";
import { PapelUsuarioRepository } from "../../../../repositories/pg/papelUsuario.repository";

jest.mock("../../../../repositories/pg/papelUsuario.repository");

describe("../../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarPorID-papelUsuario - fabricaBuscarPorIDPapelUsuario", () => {
    it("deve retornar uma instância de BuscarPapelUsuarioPorIDUseCase através de PapelUsuarioRepository", async () => {
        const useCase = await fabricaBuscarPorIDPapelUsuario();

        expect(useCase).toBeInstanceOf(BuscarPapelUsuarioPorIDUseCase);
        expect((useCase as any).papelUsuarioRepository).toBeInstanceOf(PapelUsuarioRepository);
    });
});