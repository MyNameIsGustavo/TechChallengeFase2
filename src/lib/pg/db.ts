import { Pool, type PoolClient } from 'pg';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'PRODUCTION' ? '.env.prod' : '.env.local';
dotenv.config({ path: envFile });

class Database {
    private pool: Pool;
    private client: PoolClient | null = null;

    constructor() {
        let connectionString: string;

        if (process.env.NODE_ENV === "PRODUCTION") {
            connectionString = `postgresql://${process.env.POSTGRES_USER_PROD}:${process.env.POSTGRES_PASSWORD_PROD}@${process.env.POSTGRES_HOST_PROD}:${process.env.POSTGRES_PORT_PROD}/${process.env.POSTGRES_DB_PROD}?sslmode=${process.env.SSL_MODE_PROD}`;
        } else {
            connectionString = `postgresql://${process.env.POSTGRES_USER_DEV}:${process.env.POSTGRES_PASSWORD_DEV}@${process.env.POSTGRES_HOST_DEV}:${process.env.POSTGRES_PORT_DEV}/${process.env.POSTGRES_DB_DEV}?sslmode=${process.env.SSL_MODE_DEV}`;
            console.log('Conectando ao banco de dados de desenvolvimento...', connectionString);
        }

        if (!connectionString) {
            throw new Error('DATABASE_URL não definida no .env');
        }

        const sslConfig = process.env.SSL_MODE === 'require'
            ? { rejectUnauthorized: false }
            : false;

        this.pool = new Pool({
            connectionString,
            ssl: sslConfig
        });
    }

    async conectar(): Promise<void> {
        try {
            this.client = await this.pool.connect();
            console.log('Conexão com o banco estabelecida!');
        } catch (error) {
            throw new Error(`Erro ao conectar ao banco de dados: ${error}`);
        }
    }

    getClient(): PoolClient {
        if (!this.client) {
            throw new Error('Cliente do banco de dados não está conectado. Chame bancoDeDados.conectar() primeiro.');
        }
        return this.client;
    }

    async desconectar(): Promise<void> {
        try {
            await this.client?.release();
            await this.pool.end();
            console.log('Desconectado do banco de dados!');
        } catch (error) {
            console.error('Erro ao desconectar do banco de dados:', error);
        }
    }
}

export const bancoDeDados = new Database();
