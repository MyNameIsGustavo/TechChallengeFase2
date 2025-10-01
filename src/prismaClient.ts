import { PrismaClient } from "@prisma/client";
import dotenv  from "dotenv";

const envFile = process.env.NODE_ENV === 'PRODUCTION' ? '.env.prod' : '.env.local';
dotenv.config({ path: envFile });

console.log('Variável de ambiente DATABASE_URL:', process.env.DATABASE_URL);

export const prisma = new PrismaClient();