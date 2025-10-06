import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { fabricaCriarPostagem } from "../../../use-cases/postagemUseCases/factory/fabricaCria-postagem";

jest.mock("../../../repositories/pg/postagem.repository");

describe("Caminho feliz - fabricaCriarPostagem", () => {
    it("deve chamar o método criar do repositório", async () => {
        const mockCriarPostagem = jest.fn().mockResolvedValue(
            {
                id: 1,
                dataPublicacao: "12/03/2003",
                caminhoImagem: "C:\\imagem\\imagem.png",
                titulo: "IMAGEM DA AULA",
                descricao: "DESCRICAO DA AULA",
                visibilidade: true,
                autorID: 1,
            }
        );

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            criarPostagem: mockCriarPostagem,
        }));

        const useCase = await fabricaCriarPostagem();
        const resultado = await (useCase as any).postagemRepository.criarPostagem(mockCriarPostagem);

        expect(mockCriarPostagem).toHaveBeenCalledTimes(1);
        expect(mockCriarPostagem).toHaveBeenCalledWith(mockCriarPostagem);
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

describe("Caminho triste - fabricaCriarPostagem", () => {
    it("deve retornar null quando o ID não existir", async () => {
        const mockCriarPostagem = jest.fn().mockResolvedValue(null);

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            mockCriarPostagem: mockCriarPostagem,
        }));

        const useCase = await fabricaCriarPostagem();
        const resultado = await (useCase as any).postagemRepository.mockCriarPostagem("id-invalido");

        expect(resultado).toBeNull();
        expect(mockCriarPostagem).toHaveBeenCalledTimes(1);
        expect(mockCriarPostagem).toHaveBeenCalledWith("id-invalido");
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockCriarPostagem = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            criarPostagem: mockCriarPostagem,
        }));

        const useCase = await fabricaCriarPostagem();

        let erro: Error | undefined;
        try {
            await (useCase as any).postagemRepository.criarPostagem();
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockCriarPostagem).toHaveBeenCalledTimes(1);
        expect(mockCriarPostagem).toHaveBeenCalledWith();
    });
});