import { editar } from "../../../../../http/controller/usuario/in/editar";
import { fabricaEditarUsuario } from "../../../../../use-cases/usuarioUseCases/factory/fabricaEditar-usuario";

jest.mock("../../../../../use-cases/usuarioUseCases/factory/fabricaEditar-usuario");

describe("Controller - editar usuário", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();

        (fabricaEditarUsuario as jest.Mock).mockResolvedValue({
            processar: mockProcessar,
        });

        mockRequest = {
            params: { id: "1" },
            body: {
                nomeCompleto: "Gustavo Maia",
                telefone: "11999999999",
                email: "gustavo@example.com",
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

    it("deve editar um usuário com sucesso", async () => {
        const resultadoEsperado = { id: 1, ...mockRequest.body };
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await editar(mockRequest, mockResponse);

        expect(fabricaEditarUsuario).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledWith(1, mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });

    it("deve retornar erro 400 se o ID for inválido", async () => {
        mockRequest.params = { id: "abc" };

        await editar(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "ID deve ser número inteiro positivo",
            })
        );
    });

    it("deve retornar erro 400 se o corpo for inválido", async () => {
        mockRequest.body = {
            nomeCompleto: "A",
            telefone: "123", 
            email: "email-invalido", 
            papelUsuarioID: -1, 
            senha: "123",
        };

        await editar(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "Erro de validação",
            })
        );
    });

    it("deve retornar erro 404 se o usuário não for encontrado", async () => {
        mockProcessar.mockResolvedValue(null);

        await editar(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            mensagem: "Usuário não encontrado",
        });
    });
});
