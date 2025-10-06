import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { fabricaEditarUsuario } from "../../../use-cases/usuarioUseCases/factory/fabricaEditar-usuario";

jest.mock("../../../repositories/pg/usuario.repository");

describe("Caminho feliz - fabricaEditarUsuario", () => {
    it("deve chamar o método editarUsuario do repositório", async () => {
        const dadosParaEditar = {
            id: "1",
            nomeCompleto: "Administrador",
            telefone: "123456789",
            email: "administrador@teste.com.br",
            papelUsuarioID: 1,
            senha: "senha123",
            dataCadastro: "12/03/2003",
        };

        const mockEditarUsuario = jest.fn().mockResolvedValue([
            { id: 123, papel: "Administrador" },
        ]);

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            editarUsuario: mockEditarUsuario,
        }));

        const useCase = await fabricaEditarUsuario();
        const resultado = await (useCase as any).usuarioRepository.editarUsuario(dadosParaEditar);

        expect(mockEditarUsuario).toHaveBeenCalledTimes(1);
        expect(mockEditarUsuario).toHaveBeenCalledWith(dadosParaEditar);
        expect(resultado).toEqual([{ id: 123, papel: "Administrador" }]);
    });
});

describe("Caminho triste - fabricaEditarUsuario", () => {
    it("deve retornar null quando não houver id para edição", async () => {
        const dadosParaEditar = {
            id: "1",
            nomeCompleto: "Administrador",
            telefone: "123456789",
            email: "administrador@teste.com.br",
            papelUsuarioID: 1,
            senha: "senha123",
            dataCadastro: "12/03/2003",
        };

        const mockEditarUsuario = jest.fn().mockResolvedValue(null);

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            editarUsuario: mockEditarUsuario,
        }));

        const useCase = await fabricaEditarUsuario();
        const resultado = await (useCase as any).usuarioRepository.editarUsuario(dadosParaEditar);

        expect(resultado).toBeNull();
        expect(mockEditarUsuario).toHaveBeenCalledTimes(1);
        expect(mockEditarUsuario).toHaveBeenCalledWith(dadosParaEditar);
    });

    it("deve lançar erro quando o repositório falhar", async () => {
        const mockEditarUsuario = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (UsuarioRepository as jest.Mock).mockImplementation(() => ({
            editarUsuario: mockEditarUsuario,
        }));

        const useCase = await fabricaEditarUsuario();

        let erro: Error | undefined;
        try {
            await (useCase as any).usuarioRepository.editarUsuario({ papel: "Administrador" });
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockEditarUsuario).toHaveBeenCalledTimes(1);
        expect(mockEditarUsuario).toHaveBeenCalledWith({ papel: "Administrador" });
    });
});
