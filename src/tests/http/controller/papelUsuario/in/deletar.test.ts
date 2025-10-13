import { deletar } from "../../../../../../src/http/controller/papelUsuario/in/deletar";
import { fabricaDeletaPapelUsuario } from "../../../../../../src/use-cases/papelUsuarioUseCases/factory/fabricaDeleta-papelUsuario";
import request from 'supertest';
import express from 'express';

jest.mock("../../../../../../src/use-cases/papelUsuarioUseCases/factory/fabricaDeleta-papelUsuario");

describe("Controller - deletar papel de usuário", () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockProcessar: jest.Mock;

  beforeEach(() => {
    mockProcessar = jest.fn();

    (fabricaDeletaPapelUsuario as jest.Mock).mockResolvedValue({
      processar: mockProcessar,
    });

    mockRequest = {
      params: { id: "1" },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve deletar um papel de usuário com sucesso", async () => {
    const resultadoEsperado = { mensagem: "Papel deletado com sucesso" };
    mockProcessar.mockResolvedValue(resultadoEsperado);

    await deletar(mockRequest, mockResponse);

    expect(fabricaDeletaPapelUsuario).toHaveBeenCalledTimes(1);
    expect(mockProcessar).toHaveBeenCalledWith(1);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
  });


  it("deve retornar 400 se o ID for inválido", async () => {
    mockRequest.params = { id: "abc" };

    await deletar(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        mensagem: "ID deve ser número inteiro positivo",
      })
    );

    expect(fabricaDeletaPapelUsuario).not.toHaveBeenCalled();
    expect(mockProcessar).not.toHaveBeenCalled();
  });
});

describe('DELETE /papelUsuario/:id', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.delete('/papelUsuario/:id', deletar);
  });

  it('deve retornar 201 com resultado quando ID for válido', async () => {
    const mockProcessar = jest.fn().mockResolvedValue({ mensagem: 'Papel excluído com sucesso' });
    (fabricaDeletaPapelUsuario as jest.Mock).mockResolvedValue({ processar: mockProcessar });

    const response = await request(app).delete('/papelUsuario/1');

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ mensagem: 'Papel excluído com sucesso' });
    expect(mockProcessar).toHaveBeenCalledWith(1);
  });

  it('deve retornar 400 quando o ID for inválido', async () => {
    const response = await request(app).delete('/papelUsuario/abc');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'ID deve ser número inteiro positivo');
  });
});