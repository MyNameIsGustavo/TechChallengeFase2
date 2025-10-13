import { criar } from "../../../../../http/controller/usuario/in/criar";
import { fabricaCriarUsuarios } from "../../../../../use-cases/usuarioUseCases/factory/fabricaCria-usuario";
import request from 'supertest';
import express from 'express';

jest.mock("../../../../../use-cases/usuarioUseCases/factory/fabricaCria-usuario");

describe("Controller - criar usuário", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();

        (fabricaCriarUsuarios as jest.Mock).mockResolvedValue({
            processar: mockProcessar,
        });

        mockRequest = {
            body: {
                nomeCompleto: "Gustavo Maia",
                telefone: "11999999999",
                email: "gustavo@fiap.com",
                papelUsuarioID: 1,
                senha: "senha123",
            },
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve criar um novo usuário com sucesso", async () => {
        const resultadoEsperado = { id: 1, ...mockRequest.body };
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await criar(mockRequest, mockResponse);

        expect(fabricaCriarUsuarios).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledWith(mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });

    it("deve retornar erro 400 quando os dados forem inválidos", async () => {
        mockRequest.body = {
            nomeCompleto: "G",
            telefone: "123",
            email: "email-invalido",
            papelUsuarioID: -1,
            senha: "123",
        };

        await criar(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "Erro de validação",
            })
        );
    });
});

describe('POST /usuario', () => {
    let app: express.Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.post('/usuario', criar);
    });

    it('deve retornar 201 com resultado quando os dados forem válidos', async () => {
        const mockProcessar = jest.fn().mockResolvedValue({
            id: 1,
            nomeCompleto: 'Carlos',
            telefone: '19998888222',
            email: 'carlos@exemplo.com',
            papelUsuarioID: 1,
        });

        (fabricaCriarUsuarios as jest.Mock).mockResolvedValue({ processar: mockProcessar });

        const response = await request(app)
            .post('/usuario')
            .send({
                nomeCompleto: 'Carlos',
                telefone: '19998888222',
                email: 'carlos@exemplo.com',
                papelUsuarioID: 1,
                senha: '123456',
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: 1,
            nomeCompleto: 'Carlos',
            telefone: '19998888222',
            email: 'carlos@exemplo.com',
            papelUsuarioID: 1,
        });
        expect(mockProcessar).toHaveBeenCalledWith({
            nomeCompleto: 'Carlos',
            telefone: '19998888222',
            email: 'carlos@exemplo.com',
            papelUsuarioID: 1,
            senha: '123456',
        });
    });

    it('deve retornar 400 quando os dados forem inválidos', async () => {
        const response = await request(app)
            .post('/usuario')
            .send({
                nomeCompleto: 'Ca',
                telefone: '12',
                email: 'email_invalido',
                papelUsuarioID: -1,
                senha: '123',
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('mensagem', 'Erro de validação');
        expect(response.body).toHaveProperty('erros');
    });
});