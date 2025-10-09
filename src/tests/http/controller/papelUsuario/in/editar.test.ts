import { editar } from "../../../../../../src/http/controller/papelUsuario/in/editar";
import { fabricaEditarPapelUsuario } from "../../../../../../src/use-cases/papelUsuarioUseCases/factory/fabricaEditar-papelUsuario";

jest.mock("../../../../../../src/use-cases/papelUsuarioUseCases/factory/fabricaEditar-papelUsuario");

describe("Controller - editar postagem", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();
        (fabricaEditarPapelUsuario as jest.Mock).mockResolvedValue({
            processar: mockProcessar,
        });

        mockRequest = {
            params: { id: 1 },
            body: {
                papel: "Admin",
            }
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
        const resultadoEsperado = { id: 1, papel: "admin" };
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await editar(mockRequest, mockResponse);

        expect(fabricaEditarPapelUsuario).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledWith(1, "Admin");

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });

    it("deve retornar 400 se o ID for inválido", async () => {
        mockRequest.params = { id: "ab" };

        await editar(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "ID deve ser número inteiro positivo",
            })
        );
    });
});
