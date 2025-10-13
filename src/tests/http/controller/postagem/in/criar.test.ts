import { criar } from "../../../../../http/controller/postagem/in/criar";
import { fabricaCriarPostagem } from "../../../../../use-cases/postagemUseCases/factory/fabricaCria-postagem";
import request from 'supertest';
import express from 'express';
import multer from "multer";

jest.mock("../../../../../use-cases/postagemUseCases/factory/fabricaCria-postagem");
jest.mock("dotenv");
jest.mock("fs");

describe("Controller - criar postagem", () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockProcessar: jest.Mock;

  beforeEach(() => {
    mockProcessar = jest.fn();

    (fabricaCriarPostagem as jest.Mock).mockResolvedValue({
      processar: mockProcessar,
    });

    mockRequest = {
      body: {
        titulo: "Post de teste",
        descricao: "Descrição do post",
        visibilidade: "true",
        autorID: "1",
      },
      file: { path: "imagem-teste.png" },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar uma nova postagem com sucesso", async () => {
    const resultadoEsperado = { id: 123, titulo: "Post de teste" };
    mockProcessar.mockResolvedValue(resultadoEsperado);

    await criar(mockRequest, mockResponse);

    expect(fabricaCriarPostagem).toHaveBeenCalledTimes(1);
    expect(mockProcessar).toHaveBeenCalledWith(
      expect.objectContaining({
        titulo: "Post de teste",
        descricao: "Descrição do post",
        visibilidade: true,
        autorID: 1,
      }),
      mockRequest.file
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
  });

  it("deve retornar erro 400 quando os dados forem inválidos", async () => {
    mockRequest.body = {
      titulo: "",
      descricao: "desc",
      visibilidade: "true",
      autorID: "1",
    };

    await criar(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        mensagem: "Erro de validação",
      })
    );
    expect(fabricaCriarPostagem).not.toHaveBeenCalled();
  });
});


describe("POST /postagem", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    app.post("/postagem", upload.single("file"), criar);
  });

  it("deve criar postagem com sucesso", async () => {
    const mockProcessar = jest.fn().mockResolvedValue({
      id: 1,
      titulo: "Teste",
      descricao: "Descrição teste",
    });
    (fabricaCriarPostagem as jest.Mock).mockResolvedValue({
      processar: mockProcessar,
    });

    const response = await request(app)
      .post("/postagem")
      .field("titulo", "Teste")
      .field("descricao", "Descrição teste")
      .field("visibilidade", "true")
      .field("autorID", "123");

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      titulo: "Teste",
      descricao: "Descrição teste",
    });
    expect(mockProcessar).toHaveBeenCalled();
  });
});