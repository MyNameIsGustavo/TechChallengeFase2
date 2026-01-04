import { PostagemRepository } from "../../../repositories/pg/postagem.repository";
import { IPostagem } from "../../../entities/models/postagem.interface";
import { prisma } from "../../../prismaClient";

jest.mock("../../../prismaClient", () => ({
    prisma: {
        cH_postagem: {
            create: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
        },
    },
}));

describe("repositories/pg/postagem.repository.ts - criarPostagem", () => {
    let postagemRepositorio: PostagemRepository;

    beforeEach(() => {
        postagemRepositorio = new PostagemRepository();
        jest.clearAllMocks();
    });

    it("Deve retornar uma postagem cadastrada", async () => {
        /*Arranjar*/
        const postagemMockado: IPostagem = {
            caminhoImagem: "C:\\Users\\gusta\\OneDrive\Documentos",
            titulo: "Aula de TypeScript",
            descricao: "Introdução de conteúdo de back-end",
            visibilidade: true,
            autorID: 1
        };

        /*Executar*/
        (prisma.cH_postagem.create as jest.Mock).mockResolvedValue(postagemMockado);
        const resultadoMockado = await postagemRepositorio.criarPostagem(postagemMockado);

        /*Afirmar*/
        expect(prisma.cH_postagem.create).toHaveBeenCalledWith({ data: postagemMockado });
        expect(resultadoMockado).toEqual(postagemMockado);
    });
})



describe("repositories/pg/postagem.repository.ts - buscarTodasPostagens", () => {
    let postagemRepositorio: PostagemRepository;

    beforeEach(() => {
        postagemRepositorio = new PostagemRepository();
        jest.clearAllMocks();
    });

    it("Deve retornar varias postagens cadastradas", async () => {
        /*Arranjar*/
        const postagemMockado: IPostagem[] = [
            {
                id: 1,
                caminhoImagem: "C:\\Users\\gusta\\OneDrive\Documentos",
                titulo: "Aula de TypeScript",
                descricao: "Introdução de conteúdo de back-end",
                visibilidade: true,
                autorID: 1,
                dataPublicacao: new Date()
            },
            {
                id: 2,
                caminhoImagem: "C:\\Users\\gusta\\OneDrive\Documentos",
                titulo: "Aula de Java",
                descricao: "Introdução de conteúdo de POO",
                visibilidade: true,
                autorID: 1,
                dataPublicacao: new Date()
            },
        ];

        /*Executar*/
        (prisma.cH_postagem.findMany as jest.Mock).mockResolvedValue(postagemMockado);
        const resultadoMockado = await postagemRepositorio.buscarTodasPostagens();

        /*Afirmar*/
        expect(prisma.cH_postagem.findMany).toHaveBeenCalledWith();
        expect(resultadoMockado).toEqual(postagemMockado);
    });
})

describe("repositories/pg/postagem.repository.ts - deletarPostagem", () => {
    let postagemRepositorio: PostagemRepository;

    beforeEach(() => {
        postagemRepositorio = new PostagemRepository();
        jest.clearAllMocks();
    });

    it("Deve retornar uma postagem deletada", async () => {
        /*Arranjar*/
        const postagemMockado: IPostagem =
        {
            id: 1,
            caminhoImagem: "C:\\Users\\gusta\\OneDrive\Documentos",
            titulo: "Aula de TypeScript",
            descricao: "Introdução de conteúdo de back-end",
            visibilidade: true,
            autorID: 1,
            dataPublicacao: new Date()
        };

        /*Executar*/
        (prisma.cH_postagem.delete as jest.Mock).mockResolvedValue(postagemMockado);
        const resultadoMockado = await postagemRepositorio.deletarPostagem(postagemMockado.id!)

        /*Afirmar*/
        expect(prisma.cH_postagem.delete).toHaveBeenCalledWith({ where: { id: postagemMockado.id } });
        expect(resultadoMockado).toMatchObject({
            id: 1,
            caminhoImagem: "C:\\Users\\gusta\\OneDrive\Documentos",
            titulo: "Aula de TypeScript",
            descricao: "Introdução de conteúdo de back-end",
            visibilidade: true,
            autorID: 1
        });
    });
})

describe("repositories/pg/postagem.repository.ts - editarPostagem", () => {
    let postagemRepositorio: PostagemRepository;

    beforeEach(() => {
        postagemRepositorio = new PostagemRepository();
        jest.clearAllMocks();
    });

    it("Deve retornar uma postagem editada", async () => {
        /*Arranjar*/
        const postagemMockado: IPostagem =
        {
            id: 1,
            caminhoImagem: "C:\\Users\\gusta\\OneDrive\Documentos",
            titulo: "Aula de TypeScript",
            descricao: "Introdução de conteúdo de back-end",
            visibilidade: true,
            autorID: 1,
        };

        /*Executar*/
        (prisma.cH_postagem.update as jest.Mock).mockResolvedValue(postagemMockado);
        const resultadoMockado = await postagemRepositorio.editarPostagem(postagemMockado.id!, postagemMockado)

        /*Afirmar*/
        expect(prisma.cH_postagem.update).toHaveBeenCalledWith({
            where: { id: postagemMockado.id },
            data: {
                caminhoImagem: postagemMockado.caminhoImagem,
                titulo: postagemMockado.titulo,
                descricao: postagemMockado.descricao,
                visibilidade: postagemMockado.visibilidade,
            }
        });
        expect(resultadoMockado).toEqual(postagemMockado);
    });
});

