import { Request, Response } from "express";
import { deletar } from "../../../../../http/controller/postagem/in/deletar";
import { fabricaDeletarPostagem } from "../../../../../use-cases/postagemUseCases/factory/fabricaDeleta-postagem";

jest.mock("../../../../../use-cases/postagemUseCases/factory/fabricaDeleta-postagem");

describe("Controller deletar", () => {
    let req: Partial<Request> & { params?: Record<string, string> };
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();

        req = {
            params: {},
        };
        res = {
            status: statusMock,
            json: jsonMock,
        };

        jest.clearAllMocks();
    });

    it("deve deletar postagem com ID válido", async () => {
        const idValido = 1;

        req.params = { id: idValido.toString() };

        const processarMock = jest.fn().mockResolvedValue({ mensagem: "Postagem deletada" });
        (fabricaDeletarPostagem as jest.Mock).mockResolvedValue({
            processar: processarMock,
        });

        await deletar(req as Request, res as Response);

        expect(fabricaDeletarPostagem).toHaveBeenCalledTimes(1);
        expect(processarMock).toHaveBeenCalledWith(idValido);

        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith({ mensagem: "Postagem deletada" });
    });

    it("deve retornar erro 400 quando ID for inválido", async () => {
        req.params = { id: "-1" };

        await deletar(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith(
            expect.objectContaining({
                mensagem: "ID deve ser número inteiro positivo",
                erros: expect.any(Object),
            })
        );
    });
});
