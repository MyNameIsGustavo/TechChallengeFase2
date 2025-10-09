import { criar } from "../../../../../http/controller/usuario/in/criar";
import { fabricaCriarUsuarios } from "../../../../../use-cases/usuarioUseCases/factory/fabricaCria-usuario";

jest.mock("../../../../../use-cases/usuarioUseCases/factory/fabricaCria-usuario");

describe("Controller - criar usuário", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();

        (fabricaCriarUsuarios as jest.Mock).mockResolvedValue({
            processar: mockProcessar,
        });

        mockRequest = {
            body: {
                nomeCompleto: "Gustavo Maia",
                telefone: "11999999999",
                email: "gustavo@fiap.com",
                papelUsuarioID: 1,
                senha: "senha123",
            },
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve criar um novo usuário com sucesso", async () => {
        const resultadoEsperado = { id: 1, ...mockRequest.body };
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await criar(mockRequest, mockResponse);

        expect(fabricaCriarUsuarios).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledWith(mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });

    it("deve retornar erro 400 quando os dados forem inválidos", async () => {
        mockRequest.body = {
            nomeCompleto: "G", 
            telefone: "123",
            email: "email-invalido", 
            papelUsuarioID: -1, 
            senha: "123", 
        };

        await criar(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "Erro de validação",
            })
        );
    });
});
