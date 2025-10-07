import { IPostagem } from "../../../entities/models/postagem.interface";
import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { IPostagemRepository } from "../../../repositories/postagem.repository.interface";
import { CriarPostagemUseCase } from "../../../use-cases/postagemUseCases/criar-postagem";
import { fabricaCriarPostagem } from "../../../use-cases/postagemUseCases/factory/fabricaCria-postagem";
import { uploadImagem } from "../../../use-cases/postagemUseCases/uploadImgBB-postagem";

jest.mock("../../../repositories/pg/postagem.repository");
jest.mock("../../../use-cases/postagemUseCases/uploadImgBB-postagem");

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


describe("CriarPostagemUseCase", () => {
    let mockRepositorio: jest.Mocked<IPostagemRepository>;
    let useCase: CriarPostagemUseCase;

    beforeEach(() => {
        mockRepositorio = {
            criarPostagem: jest.fn(),
        } as any;

        useCase = new CriarPostagemUseCase(mockRepositorio);
        jest.clearAllMocks();
    });

    it("deve criar uma postagem sem arquivo de imagem", async () => {
        const postagem: IPostagem = {
            id: 1,
            titulo: "Postagem sem imagem",
            descricao: "Descrição teste",
            visibilidade: true,
            autorID: 1,
            dataPublicacao: new Date("2025-10-06"),
            caminhoImagem: "",
        };

        mockRepositorio.criarPostagem.mockResolvedValue(postagem);

        const resultado = await useCase.processar(postagem);

        expect(uploadImagem).not.toHaveBeenCalled();
        expect(mockRepositorio.criarPostagem).toHaveBeenCalledTimes(1);
        expect(mockRepositorio.criarPostagem).toHaveBeenCalledWith({
            ...postagem,
            caminhoImagem: "",
        });
        expect(resultado).toEqual(postagem);
    });

    it("deve fazer upload da imagem e criar postagem com o caminho retornado", async () => {
        const postagem: IPostagem = {
            id: 2,
            titulo: "Postagem com imagem",
            descricao: "Teste de upload",
            visibilidade: true,
            autorID: 1,
            dataPublicacao: new Date("2025-10-06"),
            caminhoImagem: "",
        };

        const arquivoMock = { originalname: "foto.png" } as Express.Multer.File;
        const caminhoMock = "https://imgbb.com/foto.png";

        (uploadImagem as jest.Mock).mockResolvedValue(caminhoMock);
        mockRepositorio.criarPostagem.mockResolvedValue({
            ...postagem,
            caminhoImagem: caminhoMock,
        });

        const resultado = await useCase.processar(postagem, arquivoMock);

        expect(uploadImagem).toHaveBeenCalledTimes(1);
        expect(uploadImagem).toHaveBeenCalledWith(arquivoMock);
        expect(mockRepositorio.criarPostagem).toHaveBeenCalledWith({
            ...postagem,
            caminhoImagem: caminhoMock,
        });
        expect(resultado?.caminhoImagem).toBe(caminhoMock);
    });
});
