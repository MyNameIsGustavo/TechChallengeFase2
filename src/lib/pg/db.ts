import { Pool, type PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    private pool: Pool;
    private client: PoolClient | null = null;
    
    constructor() {
        const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}?schema=public`;
        if (!connectionString) {
            throw new Error('DATABASE_URL não definida no .env');
        }
        
        this.pool = new Pool({ connectionString });
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

// Instancia única do banco
export const bancoDeDados = new Database();
