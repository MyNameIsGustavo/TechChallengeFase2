import { deletar } from "../../../../../http/controller/usuario/in/deletar";
import { fabricaDeletarUsuarios } from "../../../../../use-cases/usuarioUseCases/factory/fabricaDeleta-usuario";
import request from 'supertest';
import express from 'express';
jest.mock("../../../../../use-cases/usuarioUseCases/factory/fabricaDeleta-usuario");

describe("Controller - deletar usuário", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();

        (fabricaDeletarUsuarios as jest.Mock).mockResolvedValue({
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

    it("deve deletar usuário com sucesso", async () => {
        const resultadoEsperado = { mensagem: "Usuário deletado com sucesso" };
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await deletar(mockRequest, mockResponse);

        expect(fabricaDeletarUsuarios).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledWith(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });

    it("deve retornar erro 400 se o ID for inválido", async () => {
        mockRequest.params = { id: "abc" };

        await deletar(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "ID deve ser número inteiro positivo",
            })
        );
    });
});


describe('DELETE /usuario/:id', () => {
    let app: express.Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.delete('/usuario/:id', deletar);
    });

    it('deve retornar 201 quando a deleção for bem-sucedida', async () => {
        const mockProcessar = jest.fn().mockResolvedValue({ mensagem: 'Usuário deletado com sucesso' });
        (fabricaDeletarUsuarios as jest.Mock).mockResolvedValue({ processar: mockProcessar });

        const response = await request(app).delete('/usuario/1');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ mensagem: 'Usuário deletado com sucesso' });
        expect(mockProcessar).toHaveBeenCalledWith(1);
    });

    it('deve retornar 400 quando o ID for inválido', async () => {
        const response = await request(app).delete('/usuario/abc');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('mensagem', 'ID deve ser número inteiro positivo');
        expect(response.body).toHaveProperty('erros');
    });
});