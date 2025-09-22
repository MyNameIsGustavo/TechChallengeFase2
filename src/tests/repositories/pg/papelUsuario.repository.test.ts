import { UsuarioRepository } from "../../../repositories/pg/usuario.repository";
import { prisma } from "../../../prismaClient";

jest.mock("../../../prismaClient", () => ({
  prisma: {
    cH_usuario: {
      findUnique: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn()
    },
  },
}));

describe("UsuarioRepository - deletarUsuario", () => {
  let repo: UsuarioRepository;

  beforeEach(() => {
    repo = new UsuarioRepository();
    jest.clearAllMocks();
  });


  it("deve lançar erro se o usuário não for encontrado", async () => {
    (prisma.cH_usuario.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(repo.deletarUsuario(999)).rejects.toThrow(
      "Erro ao deletar usuário: Error: Usuário com ID 999 não encontrado."
    );
    expect(prisma.cH_usuario.delete).not.toHaveBeenCalled();
  });
});

describe("UsuarioRepository - buscarUsuarioPorID", () => {
  let repo: UsuarioRepository;

  beforeEach(() => {
    repo = new UsuarioRepository();
    jest.clearAllMocks();
  });

  /*it("deve retornar usuário existente pelo ID", async () => {
    const usuarioFake = { id: 1, nome: "Maria" };
    (prisma.cH_usuario.findUnique as jest.Mock).mockResolvedValue(usuarioFake);

    const resultado = await repo.buscarUsuarioPorID(1);

    expect(prisma.cH_usuario.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(resultado).toEqual(usuarioFake);
  });*/

  it("deve lançar erro se o usuário não for encontrado", async () => {
    (prisma.cH_usuario.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(repo.buscarUsuarioPorID(999)).rejects.toThrow(
      "Erro ao buscar usuário por ID: Error: Usuário com ID 999 não encontrado."
    );
  });
});

/*describe("UsuarioRepository - buscarUsuarioPorEmail", () => {
  let repo: UsuarioRepository;

  beforeEach(() => {
    repo = new UsuarioRepository();
    jest.clearAllMocks();
  });

  it("deve lançar erro se o usuario por e-mail não for encontrado", async () => {
    (prisma.cH_usuario.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(repo.buscarUsuarioPorEmail('teste@teste.com.br')).rejects.toThrow(
      "Erro ao buscar usuário por email: Error: Usuário com email teste@teste.com.br não encontrado."
    );
  })
});*/

/*describe("UsuarioRepository - CriarUsuario", () => {
  let repo: UsuarioRepository;
  const usuarioFake = {
    id: 1,
    nomeCompleto: "Gustavo",
    senha: "33234712",
    email: "grmaia.rochamaia@gmail.com",
    telefone: "15 99260-4299",
    papelUsuarioID: 1,
    dataCadastro: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (prisma.cH_usuario.create as jest.Mock).mockResolvedValue(usuarioFake);
    repo = new UsuarioRepository();
  });

  it("Deve retornar um usuário cadastrado", async () => {
    const resultado = await repo.criarUsuario(usuarioFake);

    // Verifica se o prisma foi chamado corretamente
    expect(prisma.cH_usuario.create).toHaveBeenCalledWith({
      data: {
        nomeCompleto: usuarioFake.nomeCompleto,
        senha: usuarioFake.senha,
        email: usuarioFake.email,
        telefone: usuarioFake.telefone,
        papelUsuarioID: usuarioFake.papelUsuarioID
      }
    });

    // Verifica se o retorno tem as propriedades esperadas
    expect(resultado).toEqual(usuarioFake);
  });
})*/