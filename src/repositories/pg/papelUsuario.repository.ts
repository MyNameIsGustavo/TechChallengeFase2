import type { IPapelUsuarioRepository } from "../papelUsuario.repository.interface";
import type { IPapelUsuario } from "../../entities/models/papelUsuario.interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PapelUsuarioRepository implements IPapelUsuarioRepository {

    async criarPapelUsuario(papel: string): Promise<IPapelUsuario | null> {
        try {
            const novoPapel = await prisma.cH_papelUsuario.create({
                data: {
                    papelUsuario: papel
                }
            });

            return novoPapel as IPapelUsuario;
        } catch (error) {
            throw new Error(`Erro ao criar papel de usuário: ${error}`);
        }
    }

    async deletarPapelUsuario(id: number): Promise<IPapelUsuario | null> {
        try {
            const papelExistente = await prisma.cH_papelUsuario.findUnique({
                where: { id: id }
            });

            if (!papelExistente) throw new Error(`Papel de usuário com ID ${id} não encontrado.`);

            await prisma.cH_papelUsuario.delete({ where: { id: id } });

            return papelExistente as IPapelUsuario;
        } catch (error) {
            throw new Error(`Erro ao deletar papel de usuário: ${error}`);
        }
    }

    async buscarPapelUsuarioPorID(id: number): Promise<IPapelUsuario | null> {
        try {
            const papelExistente = await prisma.cH_papelUsuario.findUnique({
                where: { id: id }
            });

            if (!papelExistente) throw new Error(`Papel de usuário com ID ${id} não encontrado.`);

            return papelExistente as IPapelUsuario;
        } catch (error) {
            throw new Error(`Erro ao buscar papel de usuário por ID: ${error}`);
        }
    }

    async buscarTodosPapeisUsuarios(): Promise<IPapelUsuario[]> {
        try {
            const papeis = await prisma.cH_papelUsuario.findMany();

            if (papeis.length === 0) {
                return [];
            }

            return papeis as IPapelUsuario[];
        } catch (error) {
            throw new Error(`Erro ao buscar todos papeis de usuário: ${error}`);
        }
    }

    async editarPapelUsuario(id: number, papel: string): Promise<IPapelUsuario | null> {
        try {
            const papelExistente = await prisma.cH_papelUsuario.findUnique({
                where: { id: id }
            });

            if (!papelExistente) throw new Error(`Papel de usuário com ID ${id} não encontrado.`);

            const papelEditado = await prisma.cH_papelUsuario.update({
                data: { papelUsuario: papel },
                where: { id: id }
            })

            return papelEditado as IPapelUsuario;
        } catch (error) {
            throw new Error(`Erro ao editar papel de usuário: ${error}`);
        }
    }
}
