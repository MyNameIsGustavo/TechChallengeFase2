import { 
    Request, 
    Response, 
    NextFunction 
} from "express";

export function autorizacaoMiddleware(...papeisPermitidos: number[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const usuario = (req as any).usuario;
    
    if (!usuario || !papeisPermitidos.includes(usuario.papelUsuario)) {
      return res.status(403).json({
        mensagem: "Acesso negado",
      });
    }

    next();
  };
}
