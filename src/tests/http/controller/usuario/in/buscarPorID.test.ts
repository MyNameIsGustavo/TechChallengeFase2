import { buscarPorID } from "../../../../../http/controller/usuario/in/buscarPorID";
import { fabricaBuscarPorIDUsuario } from "../../../../../use-cases/usuarioUseCases/factory/fabricaBuscarPorID-usuario";

jest.mock("../../../../../use-cases/usuarioUseCases/factory/fabricaBuscarPorID-usuario");

describe("Controller - buscar por ID do usuário", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();

        (fabricaBuscarPorIDUsuario as jest.Mock).mockResolvedValue({
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

    it("deve buscar usuário por ID com sucesso", async () => {
        const resultadoEsperado = { id: 1, nome: "Gustavo Maia" };
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await buscarPorID(mockRequest, mockResponse);

        expect(fabricaBuscarPorIDUsuario).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledWith(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });

    it("deve retornar erro 400 se o ID for inválido", async () => {
        mockRequest.params = { id: "abc" };

        await buscarPorID(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "ID deve ser número inteiro positivo",
            })
        );
    });
});
