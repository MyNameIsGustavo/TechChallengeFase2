import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { prisma } from "../../../prismaClient";
import { IUsuario } from "../../../entities/models/usuario.interface";

jest.mock("../../../prismaClient", () => ({
    prisma: {
        cH_usuario: {
            create: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
            delete: jest.fn(),
            update: jest.fn()
        },
    },
}));

describe("repositories/pg/usuario.repository.ts - criarUsuario", () => {
    let usuarioRepositorio: UsuarioRepository;

    beforeEach(() => {
        usuarioRepositorio = new UsuarioRepository();
        jest.clearAllMocks();
    });

    it("Deve retornar um usuário cadastrado", async () => {
        /*Arranjar*/
        const usuarioMockado: IUsuario = {
            email: "gustavo.rochamaia@gmail.com",
            nomeCompleto: "Gustavo Rocha",
            papelUsuarioID: 1,
            senha: "32234712",
            telefone: "15 99260-4299"
        };

        /*Executar*/
        (prisma.cH_usuario.create as jest.Mock).mockResolvedValue(usuarioMockado);
        const resultadoMockado = await usuarioRepositorio.criarUsuario(usuarioMockado);

        /*Afirmar*/
        expect(prisma.cH_usuario.create).toHaveBeenCalledWith({ data: usuarioMockado });
        expect(resultadoMockado).toEqual(usuarioMockado);
    });
})

describe("repositories/pg/usuario.repository.ts - buscarUsuarioPorID", () => {
    let usuarioRepositorio: UsuarioRepository;

    beforeEach(() => {
        usuarioRepositorio = new UsuarioRepository();
        jest.clearAllMocks();
    });

    it("Deve retornar um usuário pelo ID", async () => {
        /*Arranjar*/
        const usuarioMockado: IUsuario = {
            id: 1,
            email: "gustavo.rochamaia@gmail.com",
            nomeCompleto: "Gustavo Rocha",
            papelUsuarioID: 1,
            senha: "32234712",
            telefone: "15 99260-4299",
            dataCadastro: new Date()
        };

        /*Executar*/
        (prisma.cH_usuario.findUnique as jest.Mock).mockResolvedValue(usuarioMockado);
        const resultadoMockado = await usuarioRepositorio.buscarUsuarioPorID(usuarioMockado.id!);

        /*Afirmar*/
        expect(prisma.cH_usuario.findUnique).toHaveBeenCalledWith({ where: { id: usuarioMockado.id } });
        expect(resultadoMockado).toEqual(usuarioMockado);
    });
})

describe("repositories/pg/usuario.repository.ts - buscarUsuarioPorEmail", () => {
    let usuarioRepositorio: UsuarioRepository;

    beforeEach(() => {
        usuarioRepositorio = new UsuarioRepository();
        jest.clearAllMocks();
    });

    it("Deve retornar um usuário pelo email", async () => {
        /*Arranjar*/
        const usuarioMockado: IUsuario = {
            id: 1,
            email: "gustavo.rochamaia@gmail.com",
            nomeCompleto: "Gustavo Rocha",
            papelUsuarioID: 1,
            senha: "32234712",
            telefone: "15 99260-4299",
            dataCadastro: new Date()
        };

        /*Executar*/
        (prisma.cH_usuario.findUnique as jest.Mock).mockResolvedValue(usuarioMockado);
        const resultadoMockado = await usuarioRepositorio.buscarUsuarioPorEmail(usuarioMockado.email);

        /*Afirmar*/
        expect(prisma.cH_usuario.findUnique).toHaveBeenCalledWith({ where: { email: usuarioMockado.email } });
        expect(resultadoMockado).toEqual(usuarioMockado);
    });
})

describe("repositories/pg/usuario.repository.ts - buscarTodosUsuarios", () => {
    let usuarioRepositorio: UsuarioRepository;

    beforeEach(() => {
        usuarioRepositorio = new UsuarioRepository();
        jest.clearAllMocks();
    });

    it("Deve retornar varios usuários", async () => {
        /*Arranjar*/
        const usuariosMockado: IUsuario[] = [
            {
                id: 1,
                email: "gustavo.rocha@gmail.com",
                nomeCompleto: "Gustavo Rocha",
                papelUsuarioID: 1,
                senha: "$2a$12$NLTSBENmSa8Y8CS93H46YesRKPX2.mqEjjeb19cEDucxyZ/4RxH3i",
                telefone: "15 99260-4299",
                dataCadastro: new Date()
            },
            {
                id: 2,
                email: "gustavo.maia@gmail.com",
                nomeCompleto: "Gustavo Maia",
                papelUsuarioID: 2,
                senha: "$2a$12$NLTSBENmSa8Y8CS93H46YesRKPX2.mqEjjeb19cEDucxyZ/4RxH3i",
                telefone: "15 99260-4299",
                dataCadastro: new Date()
            },
        ];

        /*Executar*/
        (prisma.cH_usuario.findMany as jest.Mock).mockResolvedValue(usuariosMockado);
        const resultadoMockado = await usuarioRepositorio.buscarTodosUsuarios();

        /*Afirmar*/
        expect(prisma.cH_usuario.findMany).toHaveBeenCalledWith();
        expect(resultadoMockado).toEqual(usuariosMockado);
    });
});

describe("repositories/pg/usuario.repository.ts - deletarUsuario", () => {
    let usuarioRepositorio: UsuarioRepository;

    beforeEach(() => {
        usuarioRepositorio = new UsuarioRepository();
        jest.clearAllMocks();
    });

    it("Deve retornar um usuário deletado pelo ID", async () => {
        /*Arranjar*/
        const usuarioMockado: IUsuario = {
            id: 1,
            email: "gustavo.rochamaia@gmail.com",
            nomeCompleto: "Gustavo Rocha",
            papelUsuarioID: 1,
            senha: "32234712",
            telefone: "15 99260-4299",
            dataCadastro: new Date()
        };

        /*Executar*/
        (prisma.cH_usuario.delete as jest.Mock).mockResolvedValue(usuarioMockado);
        const resultadoMockado = await usuarioRepositorio.deletarUsuario(usuarioMockado.id!);

        /*Afirmar*/
        expect(prisma.cH_usuario.delete).toHaveBeenCalledWith({ where: { id: usuarioMockado.id } });
        expect(resultadoMockado).toMatchObject({
            id: usuarioMockado.id,
            email: usuarioMockado.email,
            nomeCompleto: usuarioMockado.nomeCompleto,
            papelUsuarioID: usuarioMockado.papelUsuarioID,
            senha: usuarioMockado.senha,
            telefone: usuarioMockado.telefone
        });
    });
})

describe("repositories/pg/usuario.repository.ts - editarUsuario", () => {
    let usuarioRepositorio: UsuarioRepository;

    beforeEach(() => {
        usuarioRepositorio = new UsuarioRepository();
        jest.clearAllMocks();
    });

    it("Deve retornar um usuário editado", async () => {
        /*Arranjar*/
        const usuarioMockado: IUsuario = {
            id: 1,
            email: "gustavo.rochamaia@gmail.com",
            nomeCompleto: "Gustavo Rocha",
            papelUsuarioID: 1,
            senha: "32234712",
            telefone: "15 99260-4299",
        };

        /*Executar*/
        (prisma.cH_usuario.update as jest.Mock).mockResolvedValue(usuarioMockado);
        const resultadoMockado = await usuarioRepositorio.editarUsuario(usuarioMockado.id!, usuarioMockado);

        /*Afirmar*/
        expect(prisma.cH_usuario.update).toHaveBeenCalledWith({
            where: { id: usuarioMockado.id },
            data: {
                email: usuarioMockado.email,
                nomeCompleto: usuarioMockado.nomeCompleto,
                papelUsuarioID: usuarioMockado.papelUsuarioID,
                senha: usuarioMockado.senha,
                telefone: usuarioMockado.telefone
            },
        });
        expect(resultadoMockado).toEqual(usuarioMockado);
    });
})