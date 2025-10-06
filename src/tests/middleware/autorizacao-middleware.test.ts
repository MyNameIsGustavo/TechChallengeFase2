import { autorizacaoMiddleware } from "../../middleware/autorizacao-middleware";
import type { Request, Response, NextFunction } from "express";

describe("Middleware - autorizacaoMiddleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it("deve permitir acesso quando o usuário tem papel permitido", () => {
        
        const middleware = autorizacaoMiddleware(1, 2);

        
        (mockRequest as any).usuario = { id: 10, nome: "Admin", papelUsuario: 1 };

        middleware(mockRequest as Request, mockResponse as Response, mockNext);

        
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it("deve negar acesso quando o usuário não tem papel permitido", () => {
        const middleware = autorizacaoMiddleware(1); 

        (mockRequest as any).usuario = { id: 5, nome: "Comum", papelUsuario: 2 };

        middleware(mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({ mensagem: "Acesso negado" });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it("deve negar acesso quando o usuário não está presente na requisição", () => {
        const middleware = autorizacaoMiddleware(1, 2);

        middleware(mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({ mensagem: "Acesso negado" });
        expect(mockNext).not.toHaveBeenCalled();
    });
});
