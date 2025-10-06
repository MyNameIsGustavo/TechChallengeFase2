import { fabricaDeletaPapelUsuario } from "../../../../use-cases/papelUsuarioUseCases/factory/fabricaDeleta-papelUsuario";
import { DeletarPapelUsuarioUseCase } from "../../../../use-cases/papelUsuarioUseCases/deletar-papelUsuario";
import { PapelUsuarioRepository } from "../../../../repositories/pg/papelUsuario.repository";

jest.mock("../../../../repositories/pg/papelUsuario.repository");

describe("../../../../use-cases/papelUsuarioUseCases/factory/fabricaDeleta-papelUsuario - fabricaDeletaPapelUsuario", () => {

    it("deve retornar uma instância de DeletarPapelUsuarioUseCase através de PapelUsuarioRepository", async () => {
        const useCase = await fabricaDeletaPapelUsuario();

        expect(useCase).toBeInstanceOf(DeletarPapelUsuarioUseCase);
        expect((useCase as any).papelUsuarioRepository).toBeInstanceOf(PapelUsuarioRepository);
    });
});