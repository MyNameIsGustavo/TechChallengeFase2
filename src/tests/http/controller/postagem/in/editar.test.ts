import { editar } from "../../../../../../src/http/controller/postagem/in/editar";
import { fabricaEditarPostagem } from "../../../../../../src/use-cases/postagemUseCases/factory/fabricaEditar-postagem";

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
