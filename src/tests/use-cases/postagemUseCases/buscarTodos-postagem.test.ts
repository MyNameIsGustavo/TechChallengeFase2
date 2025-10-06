import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { fabricaBuscarTodosPostagem } from "../../../use-cases/postagemUseCases/factory/fabricaBuscarTodos-postagem";

jest.mock("../../../repositories/pg/postagem.repository");

describe("Caminho feliz - fabricaBuscarTodosPostagem", () => {
    it("deve chamar o método buscarTodos do repositório", async () => {
        const mockarTodasPostagens = jest.fn().mockResolvedValue([
            {
                id: 1,
                dataPublicacao: "12/03/2003",
                caminhoImagem: "C:\\imagem\\imagem.png",
                titulo: "IMAGEM DA AULA",
                descricao: "DESCRICAO DA AULA",
                visibilidade: true,
                autorID: 1,
            },
            {
                id: 2,
                dataPublicacao: "12/03/2003",
                caminhoImagem: "C:\\imagem\\imagem.png",
                titulo: "IMAGEM DA AULA",
                descricao: "DESCRICAO DA AULA",
                visibilidade: false,
                autorID: 1,
            },
        ]);

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            buscarTodos: mockarTodasPostagens,
        }));

        const useCase = await fabricaBuscarTodosPostagem();
        const resultado = await (useCase as any).postagemRepository.buscarTodos();

        expect(mockarTodasPostagens).toHaveBeenCalledTimes(1);
        expect(mockarTodasPostagens).toHaveBeenCalledWith();
        expect(resultado).toEqual([
            {
                id: 1,
                dataPublicacao: "12/03/2003",
                caminhoImagem: "C:\\imagem\\imagem.png",
                titulo: "IMAGEM DA AULA",
                descricao: "DESCRICAO DA AULA",
                visibilidade: true,
                autorID: 1,
            },
            {
                id: 2,
                dataPublicacao: "12/03/2003",
                caminhoImagem: "C:\\imagem\\imagem.png",
                titulo: "IMAGEM DA AULA",
                descricao: "DESCRICAO DA AULA",
                visibilidade: false,
                autorID: 1,
            },
        ]);
    });
});

describe("Caminho triste - fabricaBuscarTodosPostagem", () => {
    it("deve retornar null quando o ID não existir", async () => {
        const mockBuscarTodos = jest.fn().mockResolvedValue(null);

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            buscarTodos: mockBuscarTodos,
        }));

        const useCase = await fabricaBuscarTodosPostagem();
        const resultado = await (useCase as any).postagemRepository.buscarTodos("id-invalido");

        expect(resultado).toBeNull();
        expect(mockBuscarTodos).toHaveBeenCalledTimes(1);
        expect(mockBuscarTodos).toHaveBeenCalledWith("id-invalido");
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockBuscarTodos = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            buscarTodos: mockBuscarTodos,
        }));

        const useCase = await fabricaBuscarTodosPostagem();

        let erro: Error | undefined;
        try {
            await (useCase as any).postagemRepository.buscarTodos();
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockBuscarTodos).toHaveBeenCalledTimes(1);
        expect(mockBuscarTodos).toHaveBeenCalledWith();
    });
});