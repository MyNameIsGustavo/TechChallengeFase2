import { Request, Response } from "express";
import { buscarTodos } from "../../../../../http/controller/postagem/in/buscarTodos";
import { fabricaBuscarTodosPostagem } from "../../../../../use-cases/postagemUseCases/factory/fabricaBuscarTodos-postagem";

jest.mock("../../../../../use-cases/postagemUseCases/factory/fabricaBuscarTodos-postagem");

describe("Controller buscarTodos", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();

        req = {};
        res = {
            status: statusMock,
            json: jsonMock,
        };

        jest.clearAllMocks();
    });

    it("deve retornar todas as postagens com status 201", async () => {
        const postagensMock = [
            { id: 1, titulo: "Postagem 1", descricao: "Descrição 1" },
            { id: 2, titulo: "Postagem 2", descricao: "Descrição 2" },
        ];

        const processarMock = jest.fn().mockResolvedValue(postagensMock);
        (fabricaBuscarTodosPostagem as jest.Mock).mockResolvedValue({
            processar: processarMock,
        });

        await buscarTodos(req as Request, res as Response);

        expect(fabricaBuscarTodosPostagem).toHaveBeenCalledTimes(1);
        expect(processarMock).toHaveBeenCalledTimes(1);

        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith(postagensMock);
    });
});
