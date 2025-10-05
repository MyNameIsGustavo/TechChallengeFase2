import { bancoDeDados } from './lib/pg/db';
import { papelUsuarioRotas } from './http/controller/papelUsuario/rotas';
import { usuarioRotas } from './http/controller/usuario/rotas';
import { postagemRotas } from './http/controller/postagem/rotas';
import { prometheusConfigRota } from './http/controller/prometheus/rotas';
import { app } from './servidor';
import { configuracaoSwagger } from './swagger';
import { seedPapeisUsuarios } from '../prisma/seed';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'PRODUCTION' ? '.env.prod' : '.env.local';
dotenv.config({ path: envFile });

async function appChronosAPI() {
    await bancoDeDados.conectar();
    await seedPapeisUsuarios();

    papelUsuarioRotas(app);
    usuarioRotas(app);
    postagemRotas(app);
    
    prometheusConfigRota(); 
    configuracaoSwagger(app);
}

appChronosAPI()