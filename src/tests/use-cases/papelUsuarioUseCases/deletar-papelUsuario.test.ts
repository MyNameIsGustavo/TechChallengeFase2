import { PapelUsuarioRepository } from "../../../repositories/pg/papelUsuario.repository";
import { fabricaDeletaPapelUsuario } from "../../../use-cases/papelUsuarioUseCases/factory/fabricaDeleta-papelUsuario";

jest.mock("../../../repositories/pg/papelUsuario.repository");

describe("Caminho feliz - fabricaDeletaPapelUsuario", () => {
    it("deve chamar o método deletar do repositório", async () => {
        const delecaoID = { id: 123 };

        const mockPapelUsuario = jest.fn().mockResolvedValue([
            { id: 123, papel: "Administrador" },
        ]);

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            delecaoPapel: mockPapelUsuario,
        }));

        const useCase = await fabricaDeletaPapelUsuario();
        const resultado = await (useCase as any).papelUsuarioRepository.delecaoPapel(delecaoID);

        expect(mockPapelUsuario).toHaveBeenCalledTimes(1);
        expect(mockPapelUsuario).toHaveBeenCalledWith(delecaoID);
        expect(resultado).toEqual([
            { id: 123, papel: "Administrador" },
        ]);
    });
});

describe("Caminho triste - fabricaDeletaPapelUsuario", () => {
    it("deve retornar null quando nao houver id para delecao", async () => {
        const delecaoID = { id: 123 };

        const mockDeletarPapel = jest.fn().mockResolvedValue(null);

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            delecaoPapel: mockDeletarPapel,
        }));

        const useCase = await fabricaDeletaPapelUsuario();
        const resultado = await (useCase as any).papelUsuarioRepository.delecaoPapel(delecaoID);


        expect(resultado).toBeNull();
        expect(mockDeletarPapel).toHaveBeenCalledTimes(1);
        expect(mockDeletarPapel).toHaveBeenCalledWith(delecaoID);
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockDeletarPapel = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            delecaoPapel: mockDeletarPapel,
        }));

        const useCase = await fabricaDeletaPapelUsuario();

        let erro: Error | undefined;
        try {
            await (useCase as any).papelUsuarioRepository.delecaoPapel({ papel: "Administrador" });
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockDeletarPapel).toHaveBeenCalledTimes(1);
        expect(mockDeletarPapel).toHaveBeenCalledWith({ papel: "Administrador" });
    });
});