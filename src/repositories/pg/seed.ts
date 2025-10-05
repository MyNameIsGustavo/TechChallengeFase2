import { prisma } from "../../prismaClient";

export async function seedPapeisUsuarios() {
    const papeis = [
        { nome: "DOCENTE" },
        { nome: "ESTUDANTE" },
        { nome: "SUPORTE" }
    ];

    for (const papel of papeis) {
        const existente = await prisma.cH_papelUsuario.findFirst({
            where: { papelUsuario: papel.nome }
        });

        if (!existente) {
            await prisma.cH_papelUsuario.create({
                data: { papelUsuario: papel.nome }
            });
        }
    }

    console.log("Seed de papeis concluído!");
}