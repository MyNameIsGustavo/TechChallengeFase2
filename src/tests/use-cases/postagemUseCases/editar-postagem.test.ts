import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { fabricaEditarPostagem } from "../../../use-cases/postagemUseCases/factory/fabricaEditar-postagem";

jest.mock("../../../repositories/pg/postagem.repository");

describe("Caminho feliz - fabricaEditarPostagem", () => {
    it("deve chamar o método editar do repositório", async () => {
        const dadosParaEditar = {
            id: 1,
            dataPublicacao: "12/03/2003",
            caminhoImagem: "C:\\imagem\\imagem.png",
            titulo: "IMAGEM DA AULA",
            descricao: "DESCRICAO DA AULA",
            visibilidade: true,
            autorID: 1,
        };

        const mockUsuario = jest.fn().mockResolvedValue([
            {
                id: 1,
                dataPublicacao: "12/03/2003",
                caminhoImagem: "C:\\imagem\\imagem.png",
                titulo: "IMAGEM DA AULA",
                descricao: "DESCRICAO DA AULA",
                visibilidade: true,
                autorID: 1,
            },
        ]);

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            editarUsuario: mockUsuario,
        }));

        const useCase = await fabricaEditarPostagem();
        const resultado = await (useCase as any).postagemRepository.editarUsuario(dadosParaEditar);

        expect(mockUsuario).toHaveBeenCalledTimes(1);
        expect(mockUsuario).toHaveBeenCalledWith(dadosParaEditar);
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
        ]);
    });
});

describe("Caminho triste - fabricaEditarPostagem", () => {
    it("deve retornar null quando nao houver id para edicao", async () => {
        const dadosParaEditar = {
            id: 1,
            dataPublicacao: "12/03/2003",
            caminhoImagem: "C:\\imagem\\imagem.png",
            titulo: "IMAGEM DA AULA",
            descricao: "DESCRICAO DA AULA",
            visibilidade: true,
            autorID: 1,
        };

        const mockEditarUsuario = jest.fn().mockResolvedValue(null);

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            editarUsuario: mockEditarUsuario,
        }));

        const useCase = await fabricaEditarPostagem();
        const resultado = await (useCase as any).postagemRepository.editarUsuario(dadosParaEditar);


        expect(resultado).toBeNull();
        expect(mockEditarUsuario).toHaveBeenCalledTimes(1);
        expect(mockEditarUsuario).toHaveBeenCalledWith(dadosParaEditar);
    });

    it("deve lançar erro quando repositório falhar", async () => {
        const mockEditarUsuario = jest.fn().mockRejectedValue(new Error("Falha no banco"));

        (PostagemRepository as jest.Mock).mockImplementation(() => ({
            editarUsuario: mockEditarUsuario,
        }));

        const useCase = await fabricaEditarPostagem();

        let erro: Error | undefined;
        try {
            await (useCase as any).postagemRepository.editarUsuario({
                id: 1,
                dataPublicacao: "12/03/2003",
                caminhoImagem: "C:\\imagem\\imagem.png",
                titulo: "IMAGEM DA AULA",
                descricao: "DESCRICAO DA AULA",
                visibilidade: true,
                autorID: 1,
            });
        } catch (e) {
            erro = e as Error;
        }

        expect(erro).toBeInstanceOf(Error);
        expect(erro?.message).toBe("Falha no banco");
        expect(mockEditarUsuario).toHaveBeenCalledTimes(1);
        expect(mockEditarUsuario).toHaveBeenCalledWith({
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