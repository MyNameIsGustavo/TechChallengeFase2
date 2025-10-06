import type { Request, Response, NextFunction } from "express";
import { autenticacaoMiddleware } from "../../middleware/autenticacao-middleware";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("Middleware - autenticacaoMiddleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockRequest = {
            headers: {},
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
        process.env.SECRET_KEY = "chave_teste";
        jest.clearAllMocks();
    });

    it("deve retornar 401 se o token não for fornecido", () => {
        autenticacaoMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            mockNext
        );

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            mensagem: "Token de autenticação não fornecido",
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it("deve retornar 403 se o token for inválido", () => {
        mockRequest.headers = {
            authorization: "Bearer token_invalido",
        };

        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error("Token inválido");
        });

        autenticacaoMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            mockNext
        );

        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({
            mensagem: "Token inválido ou expirado",
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it("deve chamar next() e adicionar usuario ao request se o token for válido", () => {
        mockRequest.headers = {
            authorization: "Bearer token_valido",
        };

        const mockDecoded = { id: 1, nome: "Usuário Teste" };

        (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);

        autenticacaoMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            mockNext
        );

        expect(jwt.verify).toHaveBeenCalledWith("token_valido", "chave_teste");
        expect((mockRequest as any).usuario).toEqual(mockDecoded);
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).not.toHaveBeenCalled();
    });
});
