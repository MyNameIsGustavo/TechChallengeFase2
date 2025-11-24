import "express";

declare module "express-serve-static-core" {
    interface Request {
        usuario?: {
            id: number;
            nome?: string;
            email?: string;
            papel?: string;
            [key: string]: any;
        };
    }
}
