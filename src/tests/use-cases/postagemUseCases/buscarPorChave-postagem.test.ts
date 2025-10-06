import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { fabricaBuscarPorPostagemPorPalavraChave } from "../../../use-cases/postagemUseCases/factory/fabricaBuscarPorChave-postagem";

jest.mock("../../../repositories/pg/postagem.repository");

describe("Caminho feliz - fabricaBuscarPorPostagemPorPalavraChave", () => {
    it("deve chamar o método buscarPorChave do repositório e retornar as postagens encontradas", async () => {
        const palavraChave = "AULA";

        const mockBuscarPorChave = jest.fn().mockResolvedValue([
            {
                id: 1,
                dataPublicacao: "12/03/2003",
                caminhoImagem: "C:\\imagem\\imagem.png",
                titulo: "IMAGEM DA AULA",
                descricao: "DESCRIÇÃO DA AULA",
                visibilidade: true,
                autorID: 1,
            },
            {
                id: 2,
                dataPublicacao: "13/03/2003",
                caminhoImagem: "C:\\imagem\\imagem2.png",
                titulo: "AULA DE TESTES",
                descricao: "DESCRIÇÃO COMPLEMENTAR",
                visibilidade: false,
                autorID: 2,
            },
        ]);

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            buscarPorChave: mockBuscarPorChave,
        }));

        const useCase = await fabricaBuscarPorPostagemPorPalavraChave();
        const resultado = await (useCase as any).postagemRepository.buscarPorChave(palavraChave);

        expect(mockBuscarPorChave).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorChave).toHaveBeenCalledWith(palavraChave);
        expect(resultado).toEqual([
            {
                id: 1,
                dataPublicacao: "12/03/2003",
                caminhoImagem: "C:\\imagem\\imagem.png",
                titulo: "IMAGEM DA AULA",
                descricao: "DESCRIÇÃO DA AULA",
                visibilidade: true,
                autorID: 1,
            },
            {
                id: 2,
                dataPublicacao: "13/03/2003",
                caminhoImagem: "C:\\imagem\\imagem2.png",
                titulo: "AULA DE TESTES",
                descricao: "DESCRIÇÃO COMPLEMENTAR",
                visibilidade: false,
                autorID: 2,
            },
        ]);
    });
});

describe("Caminho triste - fabricaBuscarPorPostagemPorPalavraChave", () => {
    it("deve retornar null quando nenhuma postagem for encontrada", async () => {
        const mockBuscarPorChave = jest.fn().mockResolvedValue(null);

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            buscarPorChave: mockBuscarPorChave,
        }));

        const useCase = await fabricaBuscarPorPostagemPorPalavraChave();
        const resultado = await (useCase as any).postagemRepository.buscarPorChave("inexistente");

        expect(resultado).toBeNull();
        expect(mockBuscarPorChave).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorChave).toHaveBeenCalledWith("inexistente");
    });

    it("deve lançar erro quando o repositório falhar", async () => {
        const mockBuscarPorChave = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            buscarPorChave: mockBuscarPorChave,
        }));

        const useCase = await fabricaBuscarPorPostagemPorPalavraChave();

        let erro: Error | undefined;
        try {
            await (useCase as any).postagemRepository.buscarPorChave("erro");
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockBuscarPorChave).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorChave).toHaveBeenCalledWith("erro");
    });
});
