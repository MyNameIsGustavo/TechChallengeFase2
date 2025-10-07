import { Request, Response } from "express";
import { buscarPorPalavraChave } from "../../../../../http/controller/postagem/in/buscarPorPalavraChave";
import { fabricaBuscarPorPostagemPorPalavraChave } from "../../../../../use-cases/postagemUseCases/factory/fabricaBuscarPorChave-postagem";

jest.mock("../../../../../use-cases/postagemUseCases/factory/fabricaBuscarPorChave-postagem");

describe("Controller buscarPorPalavraChave", () => {
    let req: Partial<Request> & { query?: Record<string, any> };
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();

        req = { query: {} };
        res = {
            status: statusMock,
            json: jsonMock,
        };

        jest.clearAllMocks();
    });

    it("deve buscar postagem por palavra chave válida", async () => {
        const palavraValida = "teste";
        req.query = { palavra: palavraValida };

        const resultadoMock = [
            { id: 1, titulo: "Teste postagem", descricao: "Descrição teste" },
        ];

        const processarMock = jest.fn().mockResolvedValue(resultadoMock);
        (fabricaBuscarPorPostagemPorPalavraChave as jest.Mock).mockResolvedValue({
            processar: processarMock,
        });

        await buscarPorPalavraChave(req as Request, res as Response);

        expect(fabricaBuscarPorPostagemPorPalavraChave).toHaveBeenCalledTimes(1);
        expect(processarMock).toHaveBeenCalledWith(palavraValida);

        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith(resultadoMock);
    });

    it("deve retornar erro 400 quando palavra chave for menor que 3 caracteres", async () => {
        req.query = { palavra: "ab" };

        await buscarPorPalavraChave(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "String deve ter no mínimo 3 caracteres",
                erros: expect.any(Object),
            })
        );
    });
});
