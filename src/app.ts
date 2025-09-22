import { bancoDeDados } from './lib/pg/db';
import { papelUsuarioRotas } from './http/controller/papelUsuario/rotas';
import { usuarioRotas } from './http/controller/usuario/rotas';
import { postagemRotas } from './http/controller/postagem/rotas';
import { app } from './servidor';

async function appChronosAPI() {
    await bancoDeDados.conectar();
    papelUsuarioRotas(app);
    usuarioRotas(app);
    postagemRotas(app);
}

appChronosAPI()