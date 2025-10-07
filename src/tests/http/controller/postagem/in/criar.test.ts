import { criar } from "../../../../../http/controller/postagem/in/criar";
import { fabricaCriarPostagem } from "../../../../../use-cases/postagemUseCases/factory/fabricaCria-postagem";

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
