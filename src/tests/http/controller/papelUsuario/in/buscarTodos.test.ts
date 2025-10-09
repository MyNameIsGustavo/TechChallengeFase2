import { Request, Response } from "express";
import { buscarTodos } from "../../../../../http/controller/papelUsuario/in/buscarTodos";
import { fabricaBuscarTodosPapelUsuario } from "../../../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarTodos-papelUsuario";

jest.mock("../../../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarTodos-papelUsuario");

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

    it("deve retornar todas os papeis com status 201", async () => {
        const papeisMocks = [
            { id: 1, papel: "docente" },
            { id: 2, papel: "aluno"  },
        ];

        const processarMock = jest.fn().mockResolvedValue(papeisMocks);
        (fabricaBuscarTodosPapelUsuario as jest.Mock).mockResolvedValue({
            processar: processarMock,
        });

        await buscarTodos(req as Request, res as Response);

        expect(fabricaBuscarTodosPapelUsuario).toHaveBeenCalledTimes(1);
        expect(processarMock).toHaveBeenCalledTimes(1);

        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith(papeisMocks);
    });
});
