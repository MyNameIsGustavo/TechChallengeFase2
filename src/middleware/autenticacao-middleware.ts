import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export function autenticacaoMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ mensagem: "Token de autenticação não fornecido" });
    
    try {
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret);
        (req as any).usuario = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ mensagem: "Token inválido ou expirado" });
    }
}