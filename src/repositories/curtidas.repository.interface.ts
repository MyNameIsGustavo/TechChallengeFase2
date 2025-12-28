export interface ICurtidasRepository {
    curtir(usuarioID: number, postagemID: number): Promise<boolean>;
    descurtir(usuarioID: number, postagemID: number): Promise<boolean>;
}