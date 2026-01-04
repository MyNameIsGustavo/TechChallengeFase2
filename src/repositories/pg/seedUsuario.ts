import { prisma } from "../../prismaClient";
import bcrypt from "bcrypt";

export async function seedUsuarios() {
    const docente = await prisma.cH_papelUsuario.findUnique({
        where: { id: 1 }
    });

    const estudante = await prisma.cH_papelUsuario.findUnique({
        where: { id: 2 }
    });

    if (!docente || !estudante) {
        console.error("Papéis não encontrados. Rode o seedPapeisUsuario");
        process.exit(1);
    }

    const senhaDocente = await bcrypt.hash("docente123", 10);
    const senhaEstudante = await bcrypt.hash("estudante123", 10);

    const usuarios = [
        {
            nomeCompleto: "Professor Gustavo",
            email: "gustavo.professor@fiap.com.br",
            telefone: "15332234712",
            papelUsuarioID: docente.id,
            senha: senhaDocente
        },
        {
            nomeCompleto: "Aluno Gustavo",
            email: "gustavo.aluno@fiap.com.br",
            telefone: "15992604299",
            papelUsuarioID: estudante.id,
            senha: senhaEstudante
        }
    ];

    for (const usuario of usuarios) {
        const existente = await prisma.cH_usuario.findFirst({
            where: { email: usuario.email }
        });

        if (!existente) {
            await prisma.cH_usuario.create({
                data: usuario
            });
        } 
    }

    console.log("Seed de usuários concluído!");
}
