import { criar } from "../../../../../http/controller/papelUsuario/in/criar";
import { fabricaCriaPapelUsuario } from "../../../../../use-cases/papelUsuarioUseCases/factory/fabricaCria-papelUsuario";
import request from 'supertest';
import express from 'express';

jest.mock("../../../../../use-cases/papelUsuarioUseCases/factory/fabricaCria-papelUsuario");

describe("Controller - criar postagem", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();

        (fabricaCriaPapelUsuario as jest.Mock).mockResolvedValue({
            processar: mockProcessar,
        });

        mockRequest = {
            body: {
                id: "1",
                papel: "Admin",
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

    it("deve criar uma novo papel com sucesso", async () => {
        const resultadoEsperado = { id: 123, papel: "admin" };
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await criar(mockRequest, mockResponse);

        expect(fabricaCriaPapelUsuario).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledWith("Admin");
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });

    it("deve retornar erro 400 quando os dados forem inválidos", async () => {
        mockRequest.body = { papel: "A" };

        await criar(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "Erro de validação",
            })
        );
    });
});

describe('POST /papelUsuario', () => {
    let app: express.Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.post('/papelUsuario', criar);
    });

    it('deve retornar 201 com resultado quando papel for válido', async () => {
        const mockProcessar = jest.fn().mockResolvedValue({ id: 1, papel: 'Administrador' });
        (fabricaCriaPapelUsuario as jest.Mock).mockResolvedValue({ processar: mockProcessar });

        const response = await request(app)
            .post('/papelUsuario')
            .send({ papel: 'Administrador' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 1, papel: 'Administrador' });
        expect(mockProcessar).toHaveBeenCalledWith('Administrador');
    });

    it('deve retornar 400 quando o corpo for inválido', async () => {
        const response = await request(app)
            .post('/papelUsuario')
            .send({ papel: 'Ad' });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('mensagem', 'Erro de validação');
    });
});