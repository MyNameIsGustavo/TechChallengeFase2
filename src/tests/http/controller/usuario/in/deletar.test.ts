import { deletar } from "../../../../../http/controller/usuario/in/deletar";
import { fabricaDeletarUsuarios } from "../../../../../use-cases/usuarioUseCases/factory/fabricaDeleta-usuario";

jest.mock("../../../../../use-cases/usuarioUseCases/factory/fabricaDeleta-usuario");

describe("Controller - deletar usuário", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();

        (fabricaDeletarUsuarios as jest.Mock).mockResolvedValue({
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

    it("deve deletar usuário com sucesso", async () => {
        const resultadoEsperado = { mensagem: "Usuário deletado com sucesso" };
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await deletar(mockRequest, mockResponse);

        expect(fabricaDeletarUsuarios).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledWith(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });

    it("deve retornar erro 400 se o ID for inválido", async () => {
        mockRequest.params = { id: "abc" };

        await deletar(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "ID deve ser número inteiro positivo",
            })
        );
    });
});
