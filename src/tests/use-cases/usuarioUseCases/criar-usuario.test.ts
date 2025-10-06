import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { fabricaCriarUsuarios } from "../../../use-cases/usuarioUseCases/factory/fabricaCria-usuario";

jest.mock("../../../repositories/pg/usuario.repository");

describe("Caminho feliz - fabricaCriarUsuarios", () => {
    it("deve chamar o método criar do repositório", async () => {
        const mockCriarUsuario = jest.fn().mockResolvedValue({
            id: "1",
            nomeCompleto: "Administrador",
            telefone: "123456789",
            email: "administrador@teste.com.br",
            papelUsuarioID: 1,
            senha: "senha123",
            dataCadastro: "12/03/2003",
        },);

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            criarUsuario: mockCriarUsuario,
        }));

        const useCase = await fabricaCriarUsuarios();
        const resultado = await (useCase as any).usuarioRepository.criarUsuario(mockCriarUsuario);

        expect(mockCriarUsuario).toHaveBeenCalledTimes(1);
        expect(mockCriarUsuario).toHaveBeenCalledWith(mockCriarUsuario);
        expect(resultado).toEqual({
            id: "1",
            nomeCompleto: "Administrador",
            telefone: "123456789",
            email: "administrador@teste.com.br",
            papelUsuarioID: 1,
            senha: "senha123",
            dataCadastro: "12/03/2003",
        });
    });
});

describe("Caminho triste - fabricaCriarUsuarios", () => {
    it("deve retornar null quando nao houver parametros", async () => {
        const mockCriarUsuario = jest.fn().mockResolvedValue(null);

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            criarUsuario: mockCriarUsuario,
        }));

        const useCase = await fabricaCriarUsuarios();
        const resultado = await (useCase as any).usuarioRepository.criarUsuario();

        expect(resultado).toBeNull();
        expect(mockCriarUsuario).toHaveBeenCalledTimes(1);
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockCriarUsuario = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            criarUsuario: mockCriarUsuario,
        }));

        const useCase = await fabricaCriarUsuarios();

        let erro: Error | undefined;
        try {
            await (useCase as any).usuarioRepository.criarUsuario({
                id: "1",
                nomeCompleto: "Administrador",
                telefone: "123456789",
                email: "administrador@teste.com.br",
                papelUsuarioID: 1,
                senha: "senha123",
                dataCadastro: "12/03/2003",
            });
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockCriarUsuario).toHaveBeenCalledTimes(1);
        expect(mockCriarUsuario).toHaveBeenCalledWith({
            id: "1",
            nomeCompleto: "Administrador",
            telefone: "123456789",
            email: "administrador@teste.com.br",
            papelUsuarioID: 1,
            senha: "senha123",
            dataCadastro: "12/03/2003",
        });
    });
});