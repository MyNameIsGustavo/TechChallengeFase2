import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { fabricaDeletarUsuarios } from "../../../use-cases/usuarioUseCases/factory/fabricaDeleta-usuario";

jest.mock("../../../repositories/pg/usuario.repository");

describe("Caminho feliz - fabricaDeletarUsuarios", () => {
    it("deve chamar o método deletar do repositório", async () => {
        const delecaoID = { id: 1 };

        const mockUsuario = jest.fn().mockResolvedValue(
            {
                id: "1",
                nomeCompleto: "Administrador",
                telefone: "123456789",
                email: "administrador@teste.com.br",
                papelUsuarioID: 1,
                senha: "senha123",
                dataCadastro: "12/03/2003",
            }
        );

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            delecaoUsuario: mockUsuario,
        }));

        const useCase = await fabricaDeletarUsuarios();
        const resultado = await (useCase as any).usuarioRepository.delecaoUsuario(delecaoID);

        expect(mockUsuario).toHaveBeenCalledTimes(1);
        expect(mockUsuario).toHaveBeenCalledWith(delecaoID);
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

describe("Caminho triste - fabricaDeletarUsuarios", () => {
    it("deve retornar null quando nao houver id para delecao", async () => {
        const delecaoID = { id: 123 };

        const mockDeletarPapel = jest.fn().mockResolvedValue(null);

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            delecaoUsuario: mockDeletarPapel,
        }));

        const useCase = await fabricaDeletarUsuarios();
        const resultado = await (useCase as any).usuarioRepository.delecaoUsuario(delecaoID);

        expect(resultado).toBeNull();
        expect(mockDeletarPapel).toHaveBeenCalledTimes(1);
        expect(mockDeletarPapel).toHaveBeenCalledWith(delecaoID);
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockDeletarPapel = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            delecaoUsuario: mockDeletarPapel,
        }));

        const useCase = await fabricaDeletarUsuarios();

        let erro: Error | undefined;
        try {
            await (useCase as any).usuarioRepository.delecaoUsuario({ id: 123 });
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockDeletarPapel).toHaveBeenCalledTimes(1);
        expect(mockDeletarPapel).toHaveBeenCalledWith({ id: 123 });
    });
});