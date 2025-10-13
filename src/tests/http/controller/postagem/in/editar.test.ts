import { editar } from "../../../../../../src/http/controller/postagem/in/editar";
import { fabricaEditarPostagem } from "../../../../../../src/use-cases/postagemUseCases/factory/fabricaEditar-postagem";
import request from "supertest";
import express from "express";
import multer from "multer";

jest.mock("../../../../../../src/use-cases/postagemUseCases/factory/fabricaEditar-postagem");

describe("Controller - editar postagem", () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockProcessar: jest.Mock;

  beforeEach(() => {
    mockProcessar = jest.fn();
    (fabricaEditarPostagem as jest.Mock).mockResolvedValue({
      processar: mockProcessar,
    });

    mockRequest = {
      params: { id: "1" },
      body: {
        titulo: "Novo título",
        descricao: "Nova descrição",
        visibilidade: "true",
        autorID: "2",
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

  it("deve editar uma postagem com sucesso", async () => {
    const resultadoEsperado = { id: 1, titulo: "Novo título atualizado" };
    mockProcessar.mockResolvedValue(resultadoEsperado);

    await editar(mockRequest, mockResponse);

    expect(fabricaEditarPostagem).toHaveBeenCalledTimes(1);
    expect(mockProcessar).toHaveBeenCalledWith(
      1,
      expect.objectContaining({
        titulo: "Novo título",
        descricao: "Nova descrição",
        visibilidade: true,
        autorID: 2,
        caminhoImagem: "",
      }),
      mockRequest.file
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
  });

  it("deve retornar 400 se o ID for inválido", async () => {
    mockRequest.params = { id: "abc" };

    await editar(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        mensagem: "ID deve ser número inteiro positivo",
      })
    );
    expect(fabricaEditarPostagem).not.toHaveBeenCalled();
  });
});



describe("PUT /postagem/:id", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    app.put("/postagem/:id", upload.single("file"), editar);
  });

  it("deve editar a postagem com sucesso", async () => {
    const mockProcessar = jest.fn().mockResolvedValue({
      id: 1,
      titulo: "Postagem editada",
      descricao: "Descrição atualizada",
    });
    (fabricaEditarPostagem as jest.Mock).mockResolvedValue({
      processar: mockProcessar,
    });

    const response = await request(app)
      .put("/postagem/1")
      .field("titulo", "Postagem editada")
      .field("descricao", "Descrição atualizada")
      .field("visibilidade", "true")
      .field("autorID", "123");

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      titulo: "Postagem editada",
      descricao: "Descrição atualizada",
    });
    expect(mockProcessar).toHaveBeenCalledWith(
      1,
      {
        titulo: "Postagem editada",
        descricao: "Descrição atualizada",
        visibilidade: true,
        autorID: 123,
        caminhoImagem: "",
      },
      undefined
    );
  });
});