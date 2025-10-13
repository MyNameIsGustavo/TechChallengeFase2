import { buscarPorID } from "../../../../../http/controller/usuario/in/buscarPorID";
import { fabricaBuscarPorIDUsuario } from "../../../../../use-cases/usuarioUseCases/factory/fabricaBuscarPorID-usuario";
import request from "supertest";
import express from 'express';

jest.mock("../../../../../use-cases/usuarioUseCases/factory/fabricaBuscarPorID-usuario");

describe("Controller - buscar por ID do usuário", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();

        (fabricaBuscarPorIDUsuario as jest.Mock).mockResolvedValue({
            processar: mockProcessar,
        });

        mockRequest = {
            params: { id: 1 },
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve buscar usuário por ID com sucesso", async () => {
        const resultadoEsperado = { id: 1, nome: "Gustavo Maia" };
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await buscarPorID(mockRequest, mockResponse);

        expect(fabricaBuscarPorIDUsuario).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledWith(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });

    it("deve retornar erro 400 se o ID for inválido", async () => {
        mockRequest.params = { id: "abc" };

        await buscarPorID(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "ID deve ser número inteiro positivo",
            })
        );
    });
});


describe('GET /usuario/:id', () => {
    let app: express.Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.get('/usuario/:id', buscarPorID);
    });

    it('deve retornar 201 com resultado quando ID for válido', async () => {
        const mockProcessar = jest.fn().mockResolvedValue({
            id: 1,
            nomeCompleto: 'João da Silva',
            email: 'joao@exemplo.com',
            telefone: '11988887777',
            papelUsuarioID: 2
        });

        (fabricaBuscarPorIDUsuario as jest.Mock).mockResolvedValue({ processar: mockProcessar });

        const response = await request(app).get('/usuario/1');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: 1,
            nomeCompleto: 'João da Silva',
            email: 'joao@exemplo.com',
            telefone: '11988887777',
            papelUsuarioID: 2
        });
        expect(mockProcessar).toHaveBeenCalledWith(1);
    });

    it('deve retornar 400 quando o ID for inválido', async () => {
        const response = await request(app).get('/usuario/abc');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('mensagem', 'ID deve ser número inteiro positivo');
        expect(response.body).toHaveProperty('erros');
    });
});