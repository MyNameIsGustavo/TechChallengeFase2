import { PapelUsuarioRepository } from "../../../repositories/pg/papelUsuario.repository";
import { IPapelUsuario } from "../../../entities/models/papelUsuario.interface";
import { prisma } from "../../../prismaClient";

jest.mock("../../../prismaClient", () => ({
  prisma: {
    cH_papelUsuario: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      update: jest.fn()
    },
  },
}));

describe("repositories/pg/papelUsuario.repository.ts - criarPapelUsuario", () => {
  let papelUsuarioRepositorio: PapelUsuarioRepository;

  beforeEach(() => {
    papelUsuarioRepositorio = new PapelUsuarioRepository();
    jest.clearAllMocks();
  });

  it("Deve retornar um papel usuário cadastrado", async () => {
    /*Arranjar*/
    const papelUsuarioMockado: IPapelUsuario = {
      id: 1,
      papelUsuario: "Coordenador",
    };

    /*Executar*/
    (prisma.cH_papelUsuario.create as jest.Mock).mockResolvedValue(papelUsuarioMockado);
    const resultadoMockado = await papelUsuarioRepositorio.criarPapelUsuario(papelUsuarioMockado.papelUsuario);

    /*Afirmar*/
    expect(prisma.cH_papelUsuario.create).toHaveBeenCalledWith({
      data: { papelUsuario: papelUsuarioMockado.papelUsuario },
    });
    expect(resultadoMockado).toEqual(papelUsuarioMockado);
  });
})

describe("repositories/pg/papelUsuario.repository.ts - buscarTodosPapeisUsuarios", () => {
  let papelUsuarioRepositorio: PapelUsuarioRepository;

  beforeEach(() => {
    papelUsuarioRepositorio = new PapelUsuarioRepository();
    jest.clearAllMocks();
  });

  it("Deve retornar papeis usuários sem parâmetros.", async () => {
    /*Arranjar*/
    const papeisUsuariosMockado = [
      { id: 1, papel: "Professor" },
      { id: 2, papel: "Coordenador" },
      { id: 3, papel: "Aluno" }
    ];

    /*Executar*/
    (prisma.cH_papelUsuario.findMany as jest.Mock).mockResolvedValue(papeisUsuariosMockado);
    const resultadoMock = await papelUsuarioRepositorio.buscarTodosPapeisUsuarios();

    /*Afirmar*/
    expect(prisma.cH_papelUsuario.findMany).toHaveBeenCalledWith();
    expect(resultadoMock).toEqual(papeisUsuariosMockado);
  });
});

describe("repositories/pg/papelUsuario.repository.ts - buscarPapelUsuarioPorID", () => {
  let papelUsuarioRepositorio: PapelUsuarioRepository;

  beforeEach(() => {
    papelUsuarioRepositorio = new PapelUsuarioRepository();
    jest.clearAllMocks();
  });

  it("Deve retornar um papel usuário com o ID fornecido.", async () => {
    /*Arranjar*/
    const papelUsuarioMockado = { id: 1, papel: "Professor" };

    /*Executar*/
    (prisma.cH_papelUsuario.findUnique as jest.Mock).mockResolvedValue(papelUsuarioMockado);
    const resultadoMock = await papelUsuarioRepositorio.buscarPapelUsuarioPorID(papelUsuarioMockado.id);

    /*Afirmar*/
    expect(prisma.cH_papelUsuario.findUnique).toHaveBeenCalledWith({
      where: { id: papelUsuarioMockado.id },
    });
    expect(resultadoMock).toEqual(papelUsuarioMockado);
  });
});

describe("repositories/pg/papelUsuario.repository.ts - deletarPapelUsuario", () => {
  let papelUsuarioRepositorio: PapelUsuarioRepository;

  beforeEach(() => {
    papelUsuarioRepositorio = new PapelUsuarioRepository();
    jest.clearAllMocks();
  });

  it("Deve retornar um papel usuário deletado com ID fornecido.", async () => {
    /*Arranjar*/
    const papelUsuarioMockado = { id: 1, papel: "Professor" };

    /*Executar*/
    (prisma.cH_papelUsuario.delete as jest.Mock).mockResolvedValue(papelUsuarioMockado);
    const resultadoMock = await papelUsuarioRepositorio.deletarPapelUsuario(papelUsuarioMockado.id);

    /*Afirmar*/
    expect(prisma.cH_papelUsuario.delete).toHaveBeenCalledWith({ where: { id: papelUsuarioMockado.id } });
    expect(resultadoMock).toMatchObject(papelUsuarioMockado);
  });
});


describe("repositories/pg/papelUsuario.repository.ts - editarPapelUsuario", () => {
  let papelUsuarioRepositorio: PapelUsuarioRepository;

  beforeEach(() => {
    papelUsuarioRepositorio = new PapelUsuarioRepository();
    jest.clearAllMocks();
  });

  it("Deve retornar um papel usuário editado", async () => {
    /*Arranjar*/
    const papelUsuarioMockado: IPapelUsuario = {
      id: 1,
      papelUsuario: "Aluno",
    };

    /*Executar*/
    (prisma.cH_papelUsuario.update as jest.Mock).mockResolvedValue(papelUsuarioMockado);
    const resultadoMockado = await papelUsuarioRepositorio.editarPapelUsuario(papelUsuarioMockado.id!, papelUsuarioMockado.papelUsuario);

    /*Afirmar*/
    expect(prisma.cH_papelUsuario.update).toHaveBeenCalledWith({
      where: { id: papelUsuarioMockado.id },
      data: { papelUsuario: papelUsuarioMockado.papelUsuario },
    });
    expect(resultadoMockado).toEqual(papelUsuarioMockado);
  });
})