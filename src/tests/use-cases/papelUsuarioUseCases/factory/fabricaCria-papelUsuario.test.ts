import { fabricaCriaPapelUsuario } from "../../../../use-cases/papelUsuarioUseCases/factory/fabricaCria-papelUsuario";
import { CriarPapelUsuarioUseCase } from "../../../../use-cases/papelUsuarioUseCases/criar-papelUsuario";
import { PapelUsuarioRepository } from "../../../../repositories/pg/papelUsuario.repository";

jest.mock("../../../../repositories/pg/papelUsuario.repository");

describe("../../../../use-cases/papelUsuarioUseCases/factory/fabricaCria-papelUsuario - fabricaCriaPapelUsuario", () => {

    it("deve retornar uma instância de CriarPapelUsuarioUseCase através de PapelUsuarioRepository", async () => {
        const useCase = await fabricaCriaPapelUsuario();

        expect(useCase).toBeInstanceOf(CriarPapelUsuarioUseCase);
        expect((useCase as any).papelUsuarioRepository).toBeInstanceOf(PapelUsuarioRepository);
    });
});