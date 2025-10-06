import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { fabricaDeletarPostagem } from "../../../use-cases/postagemUseCases/factory/fabricaDeleta-postagem";

jest.mock("../../../repositories/pg/postagem.repository");

describe("Caminho feliz - fabricaDeletarPostagem", () => {
    it("deve chamar o método deletar do repositório", async () => {
        const delecaoID = { id: 1 };

        const mockUsuario = jest.fn().mockResolvedValue([
            {
                id: 1,
                dataPublicacao: "12/03/2003",
                caminhoImagem: "C:\\imagem\\imagem.png",
                titulo: "IMAGEM DA AULA",
                descricao: "DESCRICAO DA AULA",
                visibilidade: true,
                autorID: 1,
            }
        ]);

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            delecaoUsuario: mockUsuario,
        }));

        const useCase = await fabricaDeletarPostagem();
        const resultado = await (useCase as any).postagemRepository.delecaoUsuario(delecaoID);

        expect(mockUsuario).toHaveBeenCalledTimes(1);
        expect(mockUsuario).toHaveBeenCalledWith(delecaoID);
        expect(resultado).toEqual([{
            id: 1,
            dataPublicacao: "12/03/2003",
            caminhoImagem: "C:\\imagem\\imagem.png",
            titulo: "IMAGEM DA AULA",
            descricao: "DESCRICAO DA AULA",
            visibilidade: true,
            autorID: 1,
        }]);
    });
});

describe("Caminho triste - fabricaDeletarPostagem", () => {
    it("deve retornar null quando nao houver id para delecao", async () => {
        const delecaoID = { id: 123 };

        const mockDeletarUsuario = jest.fn().mockResolvedValue(null);

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            delecaoUsuario: mockDeletarUsuario,
        }));

        const useCase = await fabricaDeletarPostagem();
        const resultado = await (useCase as any).postagemRepository.delecaoUsuario(delecaoID);


        expect(resultado).toBeNull();
        expect(mockDeletarUsuario).toHaveBeenCalledTimes(1);
        expect(mockDeletarUsuario).toHaveBeenCalledWith(delecaoID);
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockDeletarUsuario = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            delecaoUsuario: mockDeletarUsuario,
        }));

        const useCase = await fabricaDeletarPostagem();

        let erro: Error | undefined;
        try {
            await (useCase as any).postagemRepository.delecaoUsuario({ id: 1 });
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockDeletarUsuario).toHaveBeenCalledTimes(1);
        expect(mockDeletarUsuario).toHaveBeenCalledWith({ id: 1 });
    });
});