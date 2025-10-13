import express, { Request, Response } from "express";
import { buscarTodos } from "../../../../../http/controller/papelUsuario/in/buscarTodos";
import { fabricaBuscarTodosPapelUsuario } from "../../../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarTodos-papelUsuario";
import request from "supertest";

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
            { id: 2, papel: "aluno" },
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

describe('GET /papelUsuario', () => {
    let app: express.Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.get('/papelUsuario', buscarTodos);
    });

    it('deve retornar 201 com resultado quando buscar todos com sucesso', async () => {
        const mockProcessar = jest.fn().mockResolvedValue([
            { id: 1, nome: 'Administrador' },
            { id: 2, nome: 'Docente' },
        ]);

        (fabricaBuscarTodosPapelUsuario as jest.Mock).mockResolvedValue({ processar: mockProcessar });

        const response = await request(app).get('/papelUsuario');

        expect(response.status).toBe(201);
        expect(response.body).toEqual([
            { id: 1, nome: 'Administrador' },
            { id: 2, nome: 'Docente' },
        ]);
        expect(mockProcessar).toHaveBeenCalledTimes(1);
    });
});