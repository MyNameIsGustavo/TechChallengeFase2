import { editar } from "../../../../../../src/http/controller/papelUsuario/in/editar";
import { fabricaEditarPapelUsuario } from "../../../../../../src/use-cases/papelUsuarioUseCases/factory/fabricaEditar-papelUsuario";
import request from 'supertest';
import express from 'express';

jest.mock("../../../../../../src/use-cases/papelUsuarioUseCases/factory/fabricaEditar-papelUsuario");

describe("Controller - editar postagem", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();
        (fabricaEditarPapelUsuario as jest.Mock).mockResolvedValue({
            processar: mockProcessar,
        });

        mockRequest = {
            params: { id: 1 },
            body: {
                papel: "Admin",
            }
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve editar uma postagem com sucesso", async () => {
        const resultadoEsperado = { id: 1, papel: "admin" };
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await editar(mockRequest, mockResponse);

        expect(fabricaEditarPapelUsuario).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledWith(1, "Admin");

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });

    it("deve retornar 400 se o ID for inválido", async () => {
        mockRequest.params = { id: "ab" };

        await editar(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "ID deve ser número inteiro positivo",
            })
        );
    });
});


describe('PUT /papelUsuario/:id', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.put('/papelUsuario/:id', editar);
  });

  it('deve retornar 201 com resultado quando ID e corpo forem válidos', async () => {
    const mockProcessar = jest.fn().mockResolvedValue({ id: 1, papel: 'Administrador atualizado' });
    (fabricaEditarPapelUsuario as jest.Mock).mockResolvedValue({ processar: mockProcessar });

    const response = await request(app)
      .put('/papelUsuario/1')
      .send({ papel: 'Administrador atualizado' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, papel: 'Administrador atualizado' });
    expect(mockProcessar).toHaveBeenCalledWith(1, 'Administrador atualizado');
  });

  it('deve retornar 400 quando o ID for inválido', async () => {
    const response = await request(app)
      .put('/papelUsuario/abc')
      .send({ papel: 'Administrador' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'ID deve ser número inteiro positivo');
  });

  it('deve retornar 400 quando o corpo for inválido', async () => {
    const response = await request(app)
      .put('/papelUsuario/1')
      .send({ papel: 'Ad' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'Erro de validação');
  });

  it('deve retornar 404 quando o papel de usuário não for encontrado', async () => {
    const mockProcessar = jest.fn().mockResolvedValue(null);
    (fabricaEditarPapelUsuario as jest.Mock).mockResolvedValue({ processar: mockProcessar });

    const response = await request(app)
      .put('/papelUsuario/99')
      .send({ papel: 'Docente' });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('mensagem', 'Papel de usuário não encontrado');
  });

});