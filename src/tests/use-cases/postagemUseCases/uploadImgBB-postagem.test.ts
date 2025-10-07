import { uploadImagem } from "../../../use-cases/postagemUseCases/uploadImgBB-postagem";

jest.mock("fs");
jest.mock("path");
jest.mock("axios");

describe("uploadImagem", () => {
    const arquivoMock = {
        path: "/tmp/teste.png",
        filename: "teste.png",
    } as Express.Multer.File;

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("deve retornar string vazia quando arquivo não for fornecido", async () => {
        const resultado = await uploadImagem(undefined);
        expect(resultado).toBe("");
    });

    it("deve retornar vazio quando NODE_ENV diferente e arquivo fornecido", async () => {
        process.env.NODE_ENV = "TEST";

        const resultado = await uploadImagem(arquivoMock);
        expect(resultado).toBe("");
    });
});
