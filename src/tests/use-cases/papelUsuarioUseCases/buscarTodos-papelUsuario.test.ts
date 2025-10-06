import { PapelUsuarioRepository } from "../../../repositories/pg/papelUsuario.repository";
import { fabricaBuscarTodosPapelUsuario } from "../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarTodos-papelUsuario";

jest.mock("../../../repositories/pg/papelUsuario.repository");

describe("Caminho feliz - fabricaBuscarTodosPapelUsuario", () => {
    it("deve chamar o método buscarTodos do repositório", async () => {
        const mockBuscarTodos = jest.fn().mockResolvedValue([
            { id: "123", nome: "Administrador" },
            { id: "456", nome: "Usuário" },
        ]);

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            buscarTodos: mockBuscarTodos,
        }));

        const useCase = await fabricaBuscarTodosPapelUsuario();
        const resultado = await (useCase as any).papelUsuarioRepository.buscarTodos();

        expect(mockBuscarTodos).toHaveBeenCalledTimes(1);
        expect(mockBuscarTodos).toHaveBeenCalledWith();
        expect(resultado).toEqual([{ id: "123", nome: "Administrador" },
        { id: "456", nome: "Usuário" },]);
    });
});

describe("Caminho triste - fabricaBuscarTodosPapelUsuario", () => {
    it("deve retornar um array vazio quando nao houver cadastros", async () => {
        const mockBuscarTodos = jest.fn().mockResolvedValue([]);

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            buscarTodos: mockBuscarTodos,
        }));

        const useCase = await fabricaBuscarTodosPapelUsuario();
        const resultado = await (useCase as any).papelUsuarioRepository.buscarTodos();

        expect(resultado).toEqual([]);
        expect(mockBuscarTodos).toHaveBeenCalledTimes(1);
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockBuscarTodos = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            buscarPorID: mockBuscarTodos,
        }));

        const useCase = await fabricaBuscarTodosPapelUsuario();

        let erro: Error | undefined;
        try {
            await (useCase as any).papelUsuarioRepository.buscarPorID("123");
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockBuscarTodos).toHaveBeenCalledTimes(1);
        expect(mockBuscarTodos).toHaveBeenCalledWith("123");
    });
});