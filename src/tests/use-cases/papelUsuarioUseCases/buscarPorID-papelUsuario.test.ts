import { PapelUsuarioRepository } from "../../../repositories/pg/papelUsuario.repository";
import { fabricaBuscarPorIDPapelUsuario } from "../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarPorID-papelUsuario";

jest.mock("../../../repositories/pg/papelUsuario.repository");

describe("Caminho feliz - fabricaBuscarPorIDPapelUsuario", () => {
    it("deve chamar o método buscarPorID do repositório com o ID correto", async () => {
        const mockBuscarPorID = jest.fn().mockResolvedValue({
            id: "123",
            nome: "Administrador",
        });

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            buscarPorID: mockBuscarPorID,
        }));

        const useCase = await fabricaBuscarPorIDPapelUsuario();
        const resultado = await (useCase as any).papelUsuarioRepository.buscarPorID("123");

        expect(mockBuscarPorID).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorID).toHaveBeenCalledWith("123");
        expect(resultado).toEqual({
            id: "123",
            nome: "Administrador",
        });
    });
});

describe("Caminho triste - fabricaBuscarPorIDPapelUsuario", () => {
    it("deve retornar null quando o ID não existir", async () => {
        const mockBuscarPorID = jest.fn().mockResolvedValue(null);

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            buscarPorID: mockBuscarPorID,
        }));

        const useCase = await fabricaBuscarPorIDPapelUsuario();
        const resultado = await (useCase as any).papelUsuarioRepository.buscarPorID("id-invalido");

        expect(resultado).toBeNull();
        expect(mockBuscarPorID).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorID).toHaveBeenCalledWith("id-invalido");
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockBuscarPorID = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            buscarPorID: mockBuscarPorID,
        }));

        const useCase = await fabricaBuscarPorIDPapelUsuario();

        let erro: Error | undefined; 
        try {
            await (useCase as any).papelUsuarioRepository.buscarPorID("123");
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockBuscarPorID).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorID).toHaveBeenCalledWith("123");
    });
});