import { IComentario } from "../../entities/models/comentario.interface";
import { prisma } from "../../prismaClient";
import { IComentarioRepository } from "../comentarios.repository.interface";

export class ComentarioRepository implements IComentarioRepository {

    async criarComentario(idUsuario: number, postagemID: number, conteudo: string): Promise<IComentario | null> {
        try {
            const comentario = await prisma.cH_comentario.create({
                data: {
                    conteudo: conteudo,
                    usuarioID: idUsuario,
                    postagemID: postagemID,
                    dataCriacao: new Date()
                }
            });

            return comentario as IComentario;
        } catch (error) {
            throw new Error(`Erro ao criar comentario: ${error}`);
        }
    }

    async deletarComentario(postagemID: number, idComentario: number): Promise<IComentario | null> {
        try {
            const comentario = await prisma.cH_comentario.findFirst({ where: { id: idComentario, postagemID } });

            if (!comentario) return null;

            const comentarioDeletado = await prisma.cH_comentario.delete({ where: { id: comentario.id } });

            return comentarioDeletado;
        } catch (error) {
            throw new Error(`Erro ao deletar comentário: ${error}`);
        }
    }
}