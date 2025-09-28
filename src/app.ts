import { bancoDeDados } from './lib/pg/db';
import { papelUsuarioRotas } from './http/controller/papelUsuario/rotas';
import { usuarioRotas } from './http/controller/usuario/rotas';
import { postagemRotas } from './http/controller/postagem/rotas';
import { prometheusConfigRota } from './http/controller/prometheus/rotas';
import { app } from './servidor';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: envFile });

async function appChronosAPI() {
    await bancoDeDados.conectar();
    papelUsuarioRotas(app);
    usuarioRotas(app);
    postagemRotas(app);
    prometheusConfigRota();
}

appChronosAPI()