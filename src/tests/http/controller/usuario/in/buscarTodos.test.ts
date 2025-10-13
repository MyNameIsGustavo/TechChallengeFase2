import { buscarTodos } from "../../../../../http/controller/usuario/in/buscarTodos";
import { fabricaBuscarTodosUsuarios } from "../../../../../use-cases/usuarioUseCases/factory/fabricaBuscarTodos-usuario";
import request from 'supertest';
import express from "express";

jest.mock("../../../../../use-cases/usuarioUseCases/factory/fabricaBuscarTodos-usuario");

describe("Controller - buscar todos usuários", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();

        (fabricaBuscarTodosUsuarios as jest.Mock).mockResolvedValue({
            processar: mockProcessar,
        });

        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar todos usuários com sucesso", async () => {
        const resultadoEsperado = [
            { id: 1, nome: "Gustavo Maia",  },
            { id: 2, nome: "Gustavo Rocha",  },
        ];
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await buscarTodos(mockRequest, mockResponse);

        expect(fabricaBuscarTodosUsuarios).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });
});


describe('GET /usuario', () => {
    let app: express.Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.get('/usuario', buscarTodos);
    });

    it('deve retornar 201 com todos os usuários', async () => {
        const mockProcessar = jest.fn().mockResolvedValue([
            { id: 1, nomeCompleto: 'gustavo', email: 'gustavo@gmail.com', telefone: '11988887777', papelUsuarioID: 2 },
            { id: 2, nomeCompleto: 'rochamaia', email: 'gustavo@exemplo.com', telefone: '11999998888', papelUsuarioID: 1 },
        ]);

        (fabricaBuscarTodosUsuarios as jest.Mock).mockResolvedValue({ processar: mockProcessar });

        const response = await request(app).get('/usuario');

        expect(response.status).toBe(201);
        expect(response.body).toEqual([
            { id: 1, nomeCompleto: 'gustavo', email: 'gustavo@gmail.com', telefone: '11988887777', papelUsuarioID: 2 },
            { id: 2, nomeCompleto: 'rochamaia', email: 'gustavo@exemplo.com', telefone: '11999998888', papelUsuarioID: 1 },
        ]);
        expect(mockProcessar).toHaveBeenCalled();
    });
});