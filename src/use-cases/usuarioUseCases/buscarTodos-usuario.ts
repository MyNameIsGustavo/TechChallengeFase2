import type { IUsuario } from "../../entities/models/usuario.interface";
import type { IUsuarioRepository } from "../../repositories/usuario.repository.interface";

export interface IPaginacao<T> {
    content: T[];
    page: number;
    limit: number;
    totalElements: number;
    totalPages: number;
}

export class BuscarTodosUsuariosUseCase {
    constructor(private usuarioRepository: IUsuarioRepository) {}

    async processar(
        pagina = 1,
        limite = 10,
        tipoUsuario?: number
    ): Promise<IPaginacao<IUsuario>> {

        const { usuarios, total } =
            await this.usuarioRepository.buscarTodosUsuarios(
                pagina,
                limite,
                tipoUsuario
            );

        return {
            content: usuarios,
            page: pagina,
            limit: limite,
            totalElements: total,
            totalPages: Math.ceil(total / limite)
        };
    }
}