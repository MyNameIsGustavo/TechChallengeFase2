import { PapelUsuarioRepository } from "../../../repositories/pg/papelUsuario.repository";
import { fabricaEditarPapelUsuario } from "../../../use-cases/papelUsuarioUseCases/factory/fabricaEditar-papelUsuario";

jest.mock("../../../repositories/pg/papelUsuario.repository");

describe("Caminho feliz - fabricaEditarPapelUsuario", () => {
    it("deve chamar o método editar do repositório", async () => {
        const dadosParaEditar = { id: 123, papel: "Administrador" };

        const mockPapelUsuario = jest.fn().mockResolvedValue([
            { id: 123, papel: "Administrador" },
        ]);

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            editarPapel: mockPapelUsuario,
        }));

        const useCase = await fabricaEditarPapelUsuario();
        const resultado = await (useCase as any).papelUsuarioRepository.editarPapel(dadosParaEditar);

        expect(mockPapelUsuario).toHaveBeenCalledTimes(1);
        expect(mockPapelUsuario).toHaveBeenCalledWith(dadosParaEditar);
        expect(resultado).toEqual([
            { id: 123, papel: "Administrador" },
        ]);
    });
});

describe("Caminho triste - fabricaEditarPapelUsuario", () => {
    it("deve retornar null quando nao houver id para edicao", async () => {
        const dadosParaEditar = { papel: "Administrador" };

        const mockEditarPapel = jest.fn().mockResolvedValue(null);

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            editarPapel: mockEditarPapel,
        }));

        const useCase = await fabricaEditarPapelUsuario();
        const resultado = await (useCase as any).papelUsuarioRepository.editarPapel(dadosParaEditar);


        expect(resultado).toBeNull();
        expect(mockEditarPapel).toHaveBeenCalledTimes(1);
        expect(mockEditarPapel).toHaveBeenCalledWith(dadosParaEditar);
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockEditarPapel = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            editarPapel: mockEditarPapel,
        }));

        const useCase = await fabricaEditarPapelUsuario();

        let erro: Error | undefined;
        try {
            await (useCase as any).papelUsuarioRepository.editarPapel({ papel: "Administrador" });
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockEditarPapel).toHaveBeenCalledTimes(1);
        expect(mockEditarPapel).toHaveBeenCalledWith({ papel: "Administrador" });
    });
});