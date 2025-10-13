import express, { Request, Response } from "express";
import { deletar } from "../../../../../http/controller/postagem/in/deletar";
import { fabricaDeletarPostagem } from "../../../../../use-cases/postagemUseCases/factory/fabricaDeleta-postagem";
import request from 'supertest';

jest.mock("../../../../../use-cases/postagemUseCases/factory/fabricaDeleta-postagem");

describe("Controller deletar", () => {
    let req: Partial<Request> & { params?: Record<string, string> };
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();

        req = {
            params: {},
        };
        res = {
            status: statusMock,
            json: jsonMock,
        };

        jest.clearAllMocks();
    });

    it("deve deletar postagem com ID válido", async () => {
        const idValido = 1;

        req.params = { id: idValido.toString() };

        const processarMock = jest.fn().mockResolvedValue({ mensagem: "Postagem deletada" });
        (fabricaDeletarPostagem as jest.Mock).mockResolvedValue({
            processar: processarMock,
        });

        await deletar(req as Request, res as Response);

        expect(fabricaDeletarPostagem).toHaveBeenCalledTimes(1);
        expect(processarMock).toHaveBeenCalledWith(idValido);

        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith({ mensagem: "Postagem deletada" });
    });

    it("deve retornar erro 400 quando ID for inválido", async () => {
        req.params = { id: "-1" };

        await deletar(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "ID deve ser número inteiro positivo",
                erros: expect.any(Object),
            })
        );
    });
});

describe('DELETE /postagem/:id', () => {
    let app: express.Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.delete('/postagem/:id', deletar);
    });

    it('deve retornar 201 quando o ID é válido', async () => {
        const mockProcessar = jest.fn().mockResolvedValue({ mensagem: 'Postagem deletada', id: 1 });
        (fabricaDeletarPostagem as jest.Mock).mockResolvedValue({ processar: mockProcessar });

        const response = await request(app).delete('/postagem/1');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ mensagem: 'Postagem deletada', id: 1 });
        expect(mockProcessar).toHaveBeenCalledWith(1);
    });
});