import { Pool, type PoolClient } from 'pg';

class Database {
    private pool: Pool;
    private client: PoolClient | null = null;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
        this.conexao();
    }

    private async conexao(): Promise<void> {
        try {
            this.client = await this.pool.connect();
            console.log('Conexão com o banco estabelecida!');
        } catch (error) {
            throw new Error(`Erro ao conectar ao banco de dados: ${error}`);
        }
    }

    getClient(): PoolClient {
        if (!this.client) {
            throw new Error('Cliente do banco de dados não está conectado.');
        }
        return this.client;
    }
}

export const bancoDeDados = new Database();