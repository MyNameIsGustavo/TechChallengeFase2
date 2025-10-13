import express, { Request, Response } from "express";
import { buscarPorID } from "../../../../../http/controller/papelUsuario/in/buscarPorID";
import { fabricaBuscarPorIDPapelUsuario } from "../../../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarPorID-papelUsuario";
import request from 'supertest';

jest.mock("../../../../../use-cases/papelUsuarioUseCases/factory/fabricaBuscarPorID-papelUsuario");

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

    it("deve buscar papel de usuário com ID válido", async () => {
        const idValido = 1;
        req.params = { id: idValido.toString() };

        const papelUsuarioMock = {
            id: idValido,
            papel: "Admin",
        };

        const processarMock = jest.fn().mockResolvedValue(papelUsuarioMock);
        (fabricaBuscarPorIDPapelUsuario as jest.Mock).mockResolvedValue({
            processar: processarMock,
        });

        await buscarPorID(req as Request, res as Response);

        expect(fabricaBuscarPorIDPapelUsuario).toHaveBeenCalledTimes(1);
        expect(processarMock).toHaveBeenCalledWith(idValido);

        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith(papelUsuarioMock);
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


describe('GET /papelUsuario/:id', () => {
    let app: express.Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.get('/papelUsuario/:id', buscarPorID);
    });

    it('deve retornar 201 com resultado quando ID for válido', async () => {
        const mockProcessar = jest.fn().mockResolvedValue({ id: 1, nome: 'Administrador' });
        (fabricaBuscarPorIDPapelUsuario as jest.Mock).mockResolvedValue({ processar: mockProcessar });

        const response = await request(app).get('/papelUsuario/1');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 1, nome: 'Administrador' });
        expect(mockProcessar).toHaveBeenCalledWith(1);
    });

    it('deve retornar 400 quando ID for inválido', async () => {
        const response = await request(app).get('/papelUsuario/abc');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('mensagem', 'ID deve ser número inteiro positivo');
    });
});