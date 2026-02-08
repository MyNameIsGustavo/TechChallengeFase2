import { PrismaClient } from "@prisma/client";

import dotenv  from "dotenv";

const envFile = process.env.NODE_ENV === 'PRODUCTION' ? '.env.prod' : '.env.local';
dotenv.config({ path: envFile });

export const prisma = new PrismaClient();