import { Request, Response } from "express";
import { buscarPorID } from "../../../../../http/controller/postagem/in/buscarPorID";
import { fabricaBuscarPorIDPostagem } from "../../../../../use-cases/postagemUseCases/factory/fabricaBuscarPorID-postagem";

jest.mock("../../../../../use-cases/postagemUseCases/factory/fabricaBuscarPorID-postagem");

describe("Controller buscarPorID", () => {
    let req: Partial<Request> & { params?: Record<string, string> };
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();

        req = { params: {} };
        res = {
            status: statusMock,
            json: jsonMock,
        };

        jest.clearAllMocks();
    });

    it("deve buscar postagem com ID válido", async () => {
        const idValido = 1;
        req.params = { id: idValido.toString() };

        const postagemMock = {
            id: idValido,
            titulo: "Teste",
            descricao: "Descrição de teste",
        };

        const processarMock = jest.fn().mockResolvedValue(postagemMock);
        (fabricaBuscarPorIDPostagem as jest.Mock).mockResolvedValue({
            processar: processarMock,
        });

        await buscarPorID(req as Request, res as Response);

        expect(fabricaBuscarPorIDPostagem).toHaveBeenCalledTimes(1);
        expect(processarMock).toHaveBeenCalledWith(idValido);

        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith(postagemMock);
    });

    it("deve retornar erro 400 quando ID for inválido", async () => {
        req.params = { id: "-1" };

        await buscarPorID(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "ID deve ser número inteiro positivo",
                erros: expect.any(Object),
            })
        );
    });
});
