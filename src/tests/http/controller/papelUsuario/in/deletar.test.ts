import { deletar } from "../../../../../../src/http/controller/papelUsuario/in/deletar";
import { fabricaDeletaPapelUsuario } from "../../../../../../src/use-cases/papelUsuarioUseCases/factory/fabricaDeleta-papelUsuario";

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
