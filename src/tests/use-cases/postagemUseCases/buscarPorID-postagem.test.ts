import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { fabricaBuscarPorIDPostagem } from "../../../use-cases/postagemUseCases/factory/fabricaBuscarPorID-postagem";

jest.mock("../../../repositories/pg/postagem.repository");

describe("Caminho feliz - fabricaBuscarPorIDPostagem", () => {
    it("deve chamar o método buscarPorID do repositório com o ID correto", async () => {
        const mockBuscarPorID = jest.fn().mockResolvedValue({
            id: 1,
            dataPublicacao: "12/03/2003",
            caminhoImagem: "C:\\imagem\\imagem.png",
            titulo: "IMAGEM DA AULA",
            descricao: "DESCRICAO DA AULA",
            visibilidade: true,
            autorID: 1,
        });

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            buscarPorID: mockBuscarPorID,
        }));

        const useCase = await fabricaBuscarPorIDPostagem();
        const resultado = await (useCase as any).postagemRepository.buscarPorID(1);

        expect(mockBuscarPorID).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorID).toHaveBeenCalledWith(1);
        expect(resultado).toEqual({
            id: 1,
            dataPublicacao: "12/03/2003",
            caminhoImagem: "C:\\imagem\\imagem.png",
            titulo: "IMAGEM DA AULA",
            descricao: "DESCRICAO DA AULA",
            visibilidade: true,
            autorID: 1,
        });
    });
});

describe("Caminho triste - fabricaBuscarPorIDPostagem", () => {
    it("deve retornar null quando o ID não existir", async () => {
        const mockBuscarPorID = jest.fn().mockResolvedValue(null);

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            buscarPorID: mockBuscarPorID,
        }));

        const useCase = await fabricaBuscarPorIDPostagem();
        const resultado = await (useCase as any).postagemRepository.buscarPorID("id-invalido");

        expect(resultado).toBeNull();
        expect(mockBuscarPorID).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorID).toHaveBeenCalledWith("id-invalido");
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockBuscarPorID = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            buscarPorID: mockBuscarPorID,
        }));

        const useCase = await fabricaBuscarPorIDPostagem();

        let erro: Error | undefined;
        try {
            await (useCase as any).postagemRepository.buscarPorID(1);
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockBuscarPorID).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorID).toHaveBeenCalledWith(1);
    });
});