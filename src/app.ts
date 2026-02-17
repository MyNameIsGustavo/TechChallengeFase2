import { app } from './servidor';
import { bancoDeDados } from './lib/pg/db';
import { papelUsuarioRotas } from './http/controller/papelUsuario/rotas';
import { usuarioRotas } from './http/controller/usuario/rotas';
import { postagemRotas } from './http/controller/postagem/rotas';
import { prometheusConfigRota } from './http/controller/prometheus/rotas';
import { configuracaoSwagger } from './swagger';
import { seedPapeisUsuarios } from './repositories/pg/seedPapelUsuario';
import { seedUsuarios } from './repositories/pg/seedUsuario';
import { curtidasRotas } from './http/controller/curtida/rotas';
import { comentarioRotas } from './http/controller/comentario/rotas';
import { dashboardRotas } from './http/controller/dashboard/rotas';
import dotenv from 'dotenv'

const envFile = process.env.NODE_ENV === 'PRODUCTION' ? '.env.prod' : '.env.local';
dotenv.config({ path: envFile });

async function appChronosAPI() {
    await bancoDeDados.conectar();
    await seedPapeisUsuarios();
    await seedUsuarios();
    papelUsuarioRotas(app);
    usuarioRotas(app);
    postagemRotas(app);
    curtidasRotas(app);
    comentarioRotas(app);
    dashboardRotas(app);
    prometheusConfigRota(); 
    configuracaoSwagger(app);
}

appChronosAPI();