import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { fabricaBuscarPorIDUsuario } from "../../../use-cases/usuarioUseCases/factory/fabricaBuscarPorID-usuario";

jest.mock("../../../repositories/pg/usuario.repository");

describe("Caminho feliz - fabricaBuscarPorIDUsuario", () => {
    it("deve chamar o método buscarPorID do repositório com o ID correto", async () => {
        const mockBuscarPorID = jest.fn().mockResolvedValue({
            id: "123",
            nomeCompleto: "Administrador",
            telefone: "123456789",
            email: "administrador@teste.com.br",
            papelUsuarioID: 1,
            senha: "senha123",
            dataCadastro: "12/03/2003",
        });

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            buscarPorID: mockBuscarPorID,
        }));

        const useCase = await fabricaBuscarPorIDUsuario();
        const resultado = await (useCase as any).usuarioRepository.buscarPorID("123");

        expect(mockBuscarPorID).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorID).toHaveBeenCalledWith("123");
        expect(resultado).toEqual({
            id: "123",
            nomeCompleto: "Administrador",
            telefone: "123456789",
            email: "administrador@teste.com.br",
            papelUsuarioID: 1,
            senha: "senha123",
            dataCadastro: "12/03/2003",
        });
    });
});

describe("Caminho triste - fabricaBuscarPorIDUsuario", () => {
    it("deve retornar null quando o ID não existir", async () => {
        const mockBuscarPorID = jest.fn().mockResolvedValue(null);

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            buscarPorID: mockBuscarPorID,
        }));

        const useCase = await fabricaBuscarPorIDUsuario();
        const resultado = await (useCase as any).usuarioRepository.buscarPorID("id-invalido");

        expect(resultado).toBeNull();
        expect(mockBuscarPorID).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorID).toHaveBeenCalledWith("id-invalido");
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockBuscarPorID = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            buscarPorID: mockBuscarPorID,
        }));

        const useCase = await fabricaBuscarPorIDUsuario();

        let erro: Error | undefined; 
        try {
            await (useCase as any).usuarioRepository.buscarPorID("123");
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockBuscarPorID).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorID).toHaveBeenCalledWith("123");
    });
});