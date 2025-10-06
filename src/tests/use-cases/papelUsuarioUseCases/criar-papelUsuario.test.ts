import { PapelUsuarioRepository } from "../../../repositories/pg/papelUsuario.repository";
import { fabricaCriaPapelUsuario } from "../../../use-cases/papelUsuarioUseCases/factory/fabricaCria-papelUsuario";

jest.mock("../../../repositories/pg/papelUsuario.repository");

describe("Caminho feliz - fabricaCriaPapelUsuario", () => {
    it("deve chamar o método criar do repositório", async () => {
        const mockPapelUsuario = jest.fn().mockResolvedValue([
            { papel: "Administrador" },
            { papel: "Usuário" },
        ]);

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            criarPapel: mockPapelUsuario,
        }));

        const useCase = await fabricaCriaPapelUsuario();
        const resultado = await (useCase as any).papelUsuarioRepository.criarPapel(mockPapelUsuario);

        expect(mockPapelUsuario).toHaveBeenCalledTimes(1);
        expect(mockPapelUsuario).toHaveBeenCalledWith(mockPapelUsuario);
        expect(resultado).toEqual([{ papel: "Administrador" },
        { papel: "Usuário" },]);
    });
});

describe("Caminho triste - fabricaCriaPapelUsuario", () => {
    it("deve retornar null quando nao houver parametros", async () => {
        const mockCriarPapel = jest.fn().mockResolvedValue(null);

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            criarPapel: mockCriarPapel,
        }));

        const useCase = await fabricaCriaPapelUsuario();
        const resultado = await (useCase as any).papelUsuarioRepository.criarPapel();

        expect(resultado).toBeNull();
        expect(mockCriarPapel).toHaveBeenCalledTimes(1);
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockCriarPapel = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (PapelUsuarioRepository as jest.Mock).mockImplementation(() => ({
            criarPapel: mockCriarPapel,
        }));

        const useCase = await fabricaCriaPapelUsuario();

        let erro: Error | undefined;
        try {
            await (useCase as any).papelUsuarioRepository.criarPapel({ papel: "Administrador" });
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockCriarPapel).toHaveBeenCalledTimes(1);
        expect(mockCriarPapel).toHaveBeenCalledWith({ papel: "Administrador" });
    });
});