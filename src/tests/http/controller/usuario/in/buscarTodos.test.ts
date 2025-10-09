import { buscarTodos } from "../../../../../http/controller/usuario/in/buscarTodos";
import { fabricaBuscarTodosUsuarios } from "../../../../../use-cases/usuarioUseCases/factory/fabricaBuscarTodos-usuario";

jest.mock("../../../../../use-cases/usuarioUseCases/factory/fabricaBuscarTodos-usuario");

describe("Controller - buscar todos usuários", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockProcessar: jest.Mock;

    beforeEach(() => {
        mockProcessar = jest.fn();

        (fabricaBuscarTodosUsuarios as jest.Mock).mockResolvedValue({
            processar: mockProcessar,
        });

        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar todos usuários com sucesso", async () => {
        const resultadoEsperado = [
            { id: 1, nome: "Gustavo Maia",  },
            { id: 2, nome: "Gustavo Rocha",  },
        ];
        mockProcessar.mockResolvedValue(resultadoEsperado);

        await buscarTodos(mockRequest, mockResponse);

        expect(fabricaBuscarTodosUsuarios).toHaveBeenCalledTimes(1);
        expect(mockProcessar).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(resultadoEsperado);
    });
});
