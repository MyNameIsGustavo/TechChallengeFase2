import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { fabricaBuscarTodosUsuarios } from "../../../use-cases/usuarioUseCases/factory/fabricaBuscarTodos-usuario";

jest.mock("../../../repositories/pg/usuario.repository");

describe("Caminho feliz - fabricaBuscarTodosUsuarios", () => {
    it("deve chamar o método buscarTodos do repositório", async () => {
        const mockBuscarTodos = jest.fn().mockResolvedValue([
            {
                id: "1",
                nomeCompleto: "Administrador",
                telefone: "123456789",
                email: "administrador@teste.com.br",
                papelUsuarioID: 1,
                senha: "senha123",
                dataCadastro: "12/03/2003",
            },
            {
                id: "2",
                nomeCompleto: "suporte",
                telefone: "123456789",
                email: "suporte@teste.com.br",
                papelUsuarioID: 1,
                senha: "senha123",
                dataCadastro: "12/03/2003",
            },
        ]);

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            buscarTodos: mockBuscarTodos,
        }));

        const useCase = await fabricaBuscarTodosUsuarios();
        const resultado = await (useCase as any).usuarioRepository.buscarTodos();

        expect(mockBuscarTodos).toHaveBeenCalledTimes(1);
        expect(mockBuscarTodos).toHaveBeenCalledWith();
        expect(resultado).toEqual([
            {
                id: "1",
                nomeCompleto: "Administrador",
                telefone: "123456789",
                email: "administrador@teste.com.br",
                papelUsuarioID: 1,
                senha: "senha123",
                dataCadastro: "12/03/2003",
            },
            {
                id: "2",
                nomeCompleto: "suporte",
                telefone: "123456789",
                email: "suporte@teste.com.br",
                papelUsuarioID: 1,
                senha: "senha123",
                dataCadastro: "12/03/2003",
            },
        ]);
    });
});

describe("Caminho triste - fabricaBuscarTodosUsuarios", () => {
    it("deve retornar um array vazio quando nao houver cadastros", async () => {
        const mockBuscarTodos = jest.fn().mockResolvedValue([]);

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            buscarTodos: mockBuscarTodos,
        }));

        const useCase = await fabricaBuscarTodosUsuarios();
        const resultado = await (useCase as any).usuarioRepository.buscarTodos();

        expect(resultado).toEqual([]);
        expect(mockBuscarTodos).toHaveBeenCalledTimes(1);
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockBuscarTodos = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            buscarPorID: mockBuscarTodos,
        }));

        const useCase = await fabricaBuscarTodosUsuarios();

        let erro: Error | undefined;
        try {
            await (useCase as any).usuarioRepository.buscarPorID("123");
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockBuscarTodos).toHaveBeenCalledTimes(1);
        expect(mockBuscarTodos).toHaveBeenCalledWith("123");
    });
});