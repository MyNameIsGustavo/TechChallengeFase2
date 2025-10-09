import { criar } from "../../../../../http/controller/papelUsuario/in/criar";
import { fabricaCriaPapelUsuario } from "../../../../../use-cases/papelUsuarioUseCases/factory/fabricaCria-papelUsuario";

jest.mock("../../../../../use-cases/papelUsuarioUseCases/factory/fabricaCria-papelUsuario");

describe("Controller - criar postagem", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();

        (fabricaCriaPapelUsuario as jest.Mock).mockResolvedValue({
            processar: mockProcessar,
        });

        mockRequest = {
            body: {
                id: "1",
                papel: "Admin",
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

    it("deve criar uma novo papel com sucesso", async () => {
        const resultadoEsperado = { id: 123, papel: "admin" };
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await criar(mockRequest, mockResponse);

        expect(fabricaCriaPapelUsuario).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledWith("Admin");
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });

    it("deve retornar erro 400 quando os dados forem inválidos", async () => {
        mockRequest.body = { papel: "A" };

        await criar(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "Erro de validação",
            })
        );
    });
});
