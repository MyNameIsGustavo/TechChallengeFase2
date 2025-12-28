import { prisma } from "../../prismaClient";
import { ICurtidasRepository } from "../curtidas.repository.interface";

export class CurtidasRepository implements ICurtidasRepository {

    async curtir(usuarioID: number, postagemID: number): Promise<boolean> {
        try {
            const curtida = await prisma.cH_curtidas.create({
                data: {
                    usuarioID,
                    postagemID
                }
            });

            return curtida ? true : false;
        } catch (error) {
            throw new Error(`Erro ao curtir postagem: ${error}`);
        }
    }

    async descurtir(usuarioID: number, postagemID: number): Promise<boolean> {
        try {
            const curtida = await prisma.cH_curtidas.findFirst({
                where: { usuarioID, postagemID }
            });

            if (!curtida) return false;

            await prisma.cH_curtidas.delete({
                where: {
                    id: curtida.id
                }
            });

            return true;
        } catch (error) {
            throw new Error(`Erro ao descurtir postagem: ${error}`);
        }
    }
}
