# Chronos - Projeto

## Sumário
1. Membro do Grupo 52 
2. Definição do Projeto  
3. Requisitos Técnicos 
4. Requisitos Funcionais 
5. Fluxograma  
6. Prova de conceito
7. Configuração de ambiente
8. Estrutura da aplicação 
9. Processo de Desenvolvimento  
10. Relatos dos Desafios Superados  
11. Entregas  
12. Bônus
13. Conclusão

## Membro do Grupo 52
- Gustavo Rocha - RM365401

## Definição do Projeto
O projeto *Chronos* consiste em uma plataforma de postagem de conteúdo voltada para docentes e alunos, permitindo centralizar informações acadêmicas através possibilitando criar, editar, visualizar e buscar postagens.

## Requisitos Técnicos

- *Back-end em Node.js*  
  - Implementação do servidor utilizando Node.js  
  - Uso do framework Express para roteamento e middleware  

- *Persistência de Dados*  
  - Utilização de banco de dados (MongoDB ou PostgreSQL)  
  - Implementação de modelos de dados adequados para postagens  

- *Containerização com Docker*  
  - Desenvolvimento e deploy com contêineres Docker para consistência de ambiente  

- *Automação com GitHub Actions*  
  - Workflows de CI/CD para testes automáticos e deploy  

- *Documentação*  
  - Guia de setup inicial, arquitetura da aplicação e uso das APIs  

- *Cobertura de Testes*  
  - Garantir pelo menos 20% do código coberto por testes unitários, especialmente em funções críticas como criação, edição e exclusão de postagens  


## Requisitos Funcionais

### Endpoints da API

### Endpoints de alunos:
- *GET /posts* - Lista de Posts  
  Permite aos alunos visualizarem todos os posts disponíveis na página principal.

- *GET /posts/:id* - Leitura de Postagens  
  Permite acessar o conteúdo completo de um post específico pelo ID.

### Endpoints de professores:
- *POST /posts* - Criação de Postagens  
  Permite que docentes criem novas postagens. Aceita dados como título, conteúdo e autor no corpo da requisição.

- *PUT /posts/:id* - Edição de Postagens  
  Permite editar uma postagem existente. É necessário fornecer o ID do post e os novos dados no corpo da requisição.

- *GET /posts* - Listagem de Todas as Postagens  
  Permite que professores vejam todas as postagens criadas, facilitando a gestão do conteúdo.

- *DELETE /posts/:id* - Exclusão de Postagens  
  Permite que docentes excluam uma postagem específica usando o ID do post como parâmetro.

- *GET /posts/search* - Busca de Postagens  
  Permite buscar posts por palavras-chave, retornando posts que contenham o termo no título ou conteúdo.

## Fluxograma Chronos

### Fluxo da aplicação - Chronos.
Esse diagrama detalha o funcionamento interno da aplicação Chronos, mostrando o caminho de uma requisição.

- Client/HTTP → Pode ser Postman, browser ou frontend, que inicia a requisição.

- Controller/HTTP → Camada que recebe a requisição, aplica middlewares e prepara a resposta.

- Aplica caso de uso → Onde a regra de negócio correspondente à requisição é acionada.

- Lógica de negócios → Coordena regras específicas e interações entre os repositórios.

- Persiste dados → Parte responsável por salvar ou atualizar informações no banco.

- Repositórios → Comunicação direta com o PostgreSQL e suporte via PgAdmin.

- Além disso, o diagrama destaca as tecnologias/ferramentas usadas em cada etapa: Express, Swagger, Prometheus, Grafana, ZOD (camada de controller e monitoramento), JWT, Bcrypt (na lógica de negócios), PostgreSQL e PgAdmin (persistência de dados).

![6a560e47-68a0-4b5e-a6be-d0a9ee934efc](https://github.com/user-attachments/assets/5fa11cb7-dff8-48aa-915d-53d937ce411e)

### Pipeline da aplicação - Chronos.
1. Desenvolvimento local: Cada feature é desenvolvida isoladamente.

2. GitHub – Integração Contínua:
    - Commits são enviados para o repositório.
  - Workflow executa:
    - Configuração do ambiente Ubuntu;

    - Instalação do Node.js e dependências;

    - Interação do Prisma com o PostgreSQL;

    - Execução de testes unitários

3. GitHub – Entrega Contínua:
    - Faz o build da aplicação Chronos;
    - Realiza login no DockerHub;
    - Cria a imagem Docker e faz push para o DockerHub.
    - DockerHub → Guarda a imagem da aplicação.

4. Deploy no Render: A aplicação é implantada no serviço Render a partir da imagem do DockerHub.

![WhatsApp Image 2025-09-29 at 08 13 40](https://github.com/user-attachments/assets/d8f726fe-0147-47d2-8b63-e8891f916047)

## Prova de conceito.
Conforme os requisitos técnicos e funcionais do documento formalizado do Tech Challenge da fase 2 do curso de Full stack development denominado "Tech Challenge - fase 02", a entrega final do projeto engloba todos os requisitos solicitados nesta fase foram entregues, sendo eles citados acima no tópico 3 (Requisitos Técnicos) e 4 (Requisitos Funcionais) do súmario. A seguir, são relacionados cada tópico com sua respectiva entrega em forma de evidência.

### Requisitos técnicos
- Back-end em Node.js: Requisito entregue conforme compartilhado nas aulas disponibilizadas na fase 02, o projeto foi desenvolvido em Node.js (Typescript) sem o uso de nenhum framework, como por exemplo: NestJS.  
    - Implementação do servidor utilizando Node.js 
    (Imagem do package.json)
    - Uso do framework Express para roteamento e middleware  
    (Imagem do package.json e configurador do servidor express)

- Persistência de Dados: Requisito efetuado conforme compartilhado em aula, foi utilizado no projeto o banco de dados PostgreSQL em uma instância no Render de deploy e uma local para ambiente de teste.  
  - Utilização de banco de dados (MongoDB ou PostgreSQL)
  (Print-screen do Render e do PostgreSQL admin)  
  - Implementação de modelos de dados adequados para postagens  
  (Print-screen do Prisma)

- Containerização com Docker: Requisito entregue utilizando o DockerHub, Dockerfile e Docker-Compose. Todos os arquivos estão disponibilizados no projeto para avaliação.   
  - Desenvolvimento e deploy com contêineres Docker para consistência de ambiente  
    (Print-screen dos arquivos)

- Automação com GitHub Actions: Os scripts de CI/CD estão disponiveís no caminho .github/workflows/ e disponíveis em forma de evidência nesta documentação.
  - Workflows de CI/CD para testes automáticos e deploy  
  (print-screen dos arquivos)

- Documentação: A documentação é composta deste arquivo README.md que contempla todo o conteúdo solicitado nas entregas: setup inicial, arquitetura e uso da API.  
  - Guia de setup inicial, arquitetura da aplicação e uso das APIs  
    (print-screen)

- Cobertura de Testes: Para evidênciar a cobertura de testes, foi gerado o relatório de coverage do Jest e anexado neste requisito.
  - Garantir pelo menos 20% do código coberto por testes unitários, especialmente em funções críticas como criação, edição e exclusão de postagens
    (print-screen)

### Requisitos funcionais

#### Endpoints da persona de aluno.
- GET /posts - Lista de Posts  
  - Permite aos alunos visualizarem todos os posts disponíveis na página principal.

  (Url de produção: )
  (Url de teste: )

- GET /posts/:id - Leitura de Postagens  
  - Permite acessar o conteúdo completo de um post específico pelo ID.

  (Url de produção: )
  (Url de teste: )

#### Endpoints da persona de docentes.
- POST /posts - Criação de Postagens  
  - Permite que docentes criem novas postagens. Aceita dados como título, conteúdo e autor no corpo da requisição.

  (Url de produção: )
  (Url de teste: )

- PUT /posts/:id - Edição de Postagens  
  - Permite editar uma postagem existente. É necessário fornecer o ID do post e os novos dados no corpo da requisição.

  (Url de produção: )
  (Url de teste: )

- GET /posts - Listagem de Todas as Postagens  
  - Permite que professores vejam todas as postagens criadas, facilitando a gestão do conteúdo.

  (Url de produção: )
  (Url de teste: )

- DELETE /posts/:id - Exclusão de Postagens  
  - Permite que docentes excluam uma postagem específica usando o ID do post como parâmetro.

  (Url de produção: )
  (Url de teste: )

- GET /posts/search - Busca de Postagens  
  - Permite buscar posts por palavras-chave, retornando posts que contenham o termo no título ou conteúdo.

  (Url de produção: )
  (Url de teste: )


## Configuração de ambiente.

Recomenda-se que os pré-requisitos de instalação de tecnologia em seu ambiente de execução sejam os seguintes, listados abaixo. Após verificar as tecnologicas instaladas, siga o procedimento em seguida para inicializar o projeto.

- Node.js: v18.19.1
- Docker: 28.3.2
- Git: 2.43.0

1. Clonar o repositório disponível no GitHub através do link: https://github.com/MyNameIsGustavo/TechChallengeFase2.git

2. Criar um arquivo ".env" e um ".env.local" na raiz do projeto e preencher as chaves conforme ".envExemplo" já disponibilizado originalmente no projeto.

3. Criar um arquivo ".gitignore" na raiz do projeto, incluindo: /node_modules, .env, .env.local /src/generated/prisma.

4. Instalar as dependências do projeto fornecendo o seguinte comando no prompt localizado no diretório do projeto: npm install

5. Com o Docker configurado em seu ambiente e localizado dentro do diretório do projeto, forneça o seguinte comando para iniciar a aplicação Docker: docker compose up

6. Após a inicialização da aplicação Docker e seus containers na etapa 5 (cinco), é possível executar a aplicação em ambiente de desenvolvimento com o seguinte comando: npm run dev

7. Para executar os testes unitários desenvolvidos utilizando o Jest, forneça o seguinte comando considerando ainda a aplicação iniciada com o Docker na etapa 5 (cinco): npm test 

## Estrutura da aplicação

1. Entities
- Caminho: src/entities/
- Responsabilidade: Define de forma abstrata os atributos de cada entidade do sistema.

2. Controller/http
- Caminho: src/controllers/http/
- Responsabilidade: Enviar e receber requisições HTTP, tratando apenas requisição e resposta e retornando o status code adequado.

3. lib/pg
- Caminho: src/lib/pg/
- Responsabilidade: Configurar e fornecer a conexão com o banco de dados PostgreSQL.

4. Middleware
- Caminho: src/middleware/
- Responsabilidade: Interceptar requisições para validações ou tratamentos específicos entre requisição e resposta.

5. Repositories
- Caminho: src/repositories/
- Responsabilidade: Persistência de dados no banco de dados, sem lógica de negócio.

6. Use-cases
- Caminho: src/use-cases/
- Responsabilidade: Aplicar a lógica de negócio e coordenar interações entre camadas, utilizando Factory Pattern quando necessário.

7. Tests
- Caminho: src/tests/
- Responsabilidade: Testar cada método modularmente, seguindo a mesma estrutura de camadas da aplicação.

8. app.ts
- Responsabilidade: Arquivo de entrada da aplicação, inicializando o app.

9. servidor.ts
- Responsabilidade: Configurar e iniciar o servidor HTTP utilizando Express.

10. prismaClient.ts
- Caminho: src/prismaClient.ts
- Responsabilidade: Instanciar o Prisma Client e disponibilizá-lo para toda a aplicação.

11. prisma/schema.prisma
- Caminho: prisma/schema.prisma
- Responsabilidade: Definir modelos e tabelas do banco de dados PostgreSQL.

12. node_modules/
- Pasta: node_modules	
- Responsabilidade: Armazena bibliotecas externas

13. coverage/
- Pasta: coverage	
- Responsabilidade: Estatísticas do Jest sobre testes unitários

14. /.github
- Pasta: .github	
- Responsabilidade: Configuração de CI/CD com GitHub

15. docker-compose.yaml
- Arquivo: docker-compose.yaml	
- Responsabilidade: Orquestração de containers da aplicação

16. dockerfile
- Arquivo: Dockerfile	
- Responsabilidade: Arquivo de entrada para container Docker

17. jest.config.ts
- Arquivo: jest.config.ts
- Responsabilidade: Configuração do Jest para testes unitários

18. package.json
- Arquivo: package.json	
- Responsabilidade: Gerenciamento de dependências e scripts

19. package-lock.json
- Arquivo: package-lock.json	
- Responsabilidade: Registro das versões instaladas

20. tsconfig.json
- Arquivo: tsconfig.json	
- Responsabilidade: Configuração do TypeScript

## Processo de Desenvolvimento

### Planejamento das funcionalidades 
O desenvolvimento do projeto foi idealizado, primeiramente, para cumprir todos os requisitos técnicos e funcionais propostos. Ao decorrer do desenvolvimento do Tech Challenge alinhado com a absorção do conteúdo proposto nas aulas, o projeto foi sendo incrementado com novos conceitos e ferramentas para que se fosse elevado o nível da entrega final.

O projeto foi construído tanto para rodar localmente para execução de testes e validações de novas features quanto em produção através do Render para a disponibilização da aplicação para usuários. Destaco ainda que o Render possui planos de serviços gratuitos por curtos períodos de tempo e foi considerado para este projeto que a aplicação suprisse esta linha de serviços. Este sem dúvida, foi o ponto crucial da etapa de tempo de desenvolvimento do projeto. O banco de dados PostgreSQL utilizado, por exemplo, ficará disponível em produção até o dia 28/10 conforme alerta exibido na plataforma e anexado neste documento como evidência.

A frequência de esforço empregado para o desenvolvimento das features foram diárias e contínuas para que fosse honrado, primeiramente, os requisitos técnicos e funcionais e posteriormente adicionado novas tecnologias considerando ainda as questões do prazo de desenvolvimento citado acima. 

### Tecnologias e ferramentas 
Todas as tecnologias, ferramentas e padrões de arquitetura utilizados neste projeto foram selecionados com base no conteúdo abordado durante a Fase 02 do curso de Full Stack Development – Pós-Tech. O objetivo foi garantir coerência com os aprendizados teóricos, além de possibilitar a absorção prática e a consolidação do conhecimento adquirido ao longo da fase.

- Node.js – Plataforma de execução JavaScript no servidor.

- Express.js – Framework web minimalista para criação da API.

- Prisma ORM – ORM para integração e manipulação do banco PostgreSQL.

- Zod – Biblioteca de validação e tipagem de dados no controller.

- JWT (JsonWebToken) – Autenticação e controle de acesso por token.

- Bcrypt – Criptografia de senhas antes da persistência.

- Swagger (OpenAPI) – Documentação da API.

- PostgreSQL – Banco de dados relacional.

- PgAdmin – Interface gráfica para administração do PostgreSQL.

- Jest (implícito com testes unitários) – Framework de testes unitários.

- Docker – Containerização da aplicação.

- Docker Compose – Orquestração dos containers.

- DockerHub – Registro de imagens Docker para deploy.

- GitHub Actions – Integração e entrega contínua (CI/CD).

- Render – Plataforma de deploy da aplicação em produção.

- Prometheus – Coleta e exposição de métricas da aplicação via /metrics.

- Grafana – Visualização gráfica e interativa das métricas coletadas.

## Relatos dos Desafios Superados
*Gustavo Rocha - RM365401*: Durante a Fase 02 da pós-tech da FIAP, focada em Back-end e Qualidade, enfrentei diversos obstáculos, que consegui superar. Entre as principais dificuldades, a aprendizagem de novos conceitos e tecnologias em um curto período de tempo, como por exemplo: Docker, CI/CD no GitHub Actions, integração com o banco PostgreSQL no Render, Prometheus, Grafana e testes unitários.

Configuração de ambiente do Docker: A configuração inicial do Docker/WSL (Linux), dockerfile e o docker-compose com sua integração com o projeto foi desafiadora. Precisei refazer o processo várias vezes para compreender plenamente seu funcionamento.

Pipeline de projeto: Foi meu primeiro contato com o GitHub Actions para CI/CD. Nesse processo, executei múltiplos testes até identificar e corrigir erros, garantindo o funcionamento correto da pipeline e completar a entrega do requisito técnico.

Processo de configuração do banco de dados: No início, utilizei o banco PostgreSQL localmente. Porém, no momento final do projeto, durante o deploy da aplicação, percebi que o banco precisava estar disponível no Render para acesso pela API. Esse foi um desafio significativo, pois foi minha primeira experiência com essa situação.

Gerenciamento de logs: O Prometheus e o Grafana também foram conceitos novos para mim nesta fase. Foi muito gratificante conseguir adicioná-los ao projeto, especialmente considerando que estavam fora do escopo técnico inicial — representando um diferencial adicional entregue.

Qualidade do código: Os testes unitários demandaram mais tempo de desenvolvimento, pois tratam-se de um tema muito extenso. Precisei estudar profundamente sobre o assunto e apliquei a técnica dos três A's (Arrange, Act, Assert) para criar testes padronizados e consistentes na aplicação garantindo o mínimo solicitado no escopo técnico de um coverage de, no mínimo, 20% da aplicação.

Conciliar o aprendizado e aplicação desses conteúdos com o período da Fase 02 foi um grande desafio. No entanto, apesar das dificuldades, finalizei o projeto entregando todos os requisitos técnicos previstos, além de adicionar tecnologias e funcionalidades extras que enriqueceram a entrega final.

## Entregas

- *Apresentação em vídeo gravado*  
    - Conforme procedimento validado na fase 01 da pós-tech, o vídeo de apresentação gravado foi disponibilizado na plataforma Youtube para acesso irrestrito dos professores e avaliadores. O vídeo pode ser acessado através da seguinte URL:

- *Código-fonte do projeto*  
    - O código-fonte e a documentação está disponibilizado na plataforma GitHub no repositório do projeto e pode ser acessado através da URL: https://github.com/MyNameIsGustavo/TechChallengeFase2

    - Além disso, também é possível acessar apenas a imagem de produção do Docker do projeto através do DockerHub na seguinte URL: https://hub.docker.com/r/grmaia/chronos

- *Arquivos utilizados na apresentação*  
    - Todos os arquivos utilizados na apresentação do vídeo serão entregues em forma de evidência neste documento "README.md" do projeto. Durante o processo da apresentação foi criado slides de exemplicação do conteúdo e, está evidência, também será entregue e disponibilizada através da seguinte URL:

## Bônus

- Administrador Postgre (PgAdmin): Para o gerenciamento do banco de dados PostgreSQL em ambiente local, foi utilizada a ferramenta PgAdmin, acessada via navegador através da URL: *http://localhost:8080/login* .Essa interface gráfica facilita a administração do banco ao oferecer uma ampla gama de funcionalidades, como visualização estruturada de dados, execução de queries, criação de esquemas e tabelas, além de dashboards interativos que otimizam o entendimento e análise dos dados.
(Print-screen do banco de dados)

- Criptografia de senhas utilizando o Bcrypt: Com o objetivo de garantir a segurança dos dados sensíveis dos usuários, especialmente as senhas, foi utilizada a biblioteca Bcrypt para realizar a criptografia antes de armazená-las no banco de dados. Esse processo garante que as senhas não sejam salvas em texto plano, tornando o sistema mais robusto.
(Print-screen do banco de dados);

- Autenticação utilizando JsonWebToken: Para proteger rotas específicas da API — como as destinadas a perfis de aluno e docente — foi implementado o sistema de autenticação via JSON Web Token (JWT). Além de restringir o acesso a usuários autenticados, o JWT também contribui para a integridade e segurança dos dados transmitidos entre cliente e servidor. 
(Print-screen do token);

- Gerenciamento de Log's com Prometheus: Como parte da evolução técnica no projeto, foi integrado o Prometheus para o monitoramento e coleta de métricas da aplicação.
Por meio do endpoint /metrics no deploy na plataforma Render *https://chronos-latest.onrender.com/metrics*, é possível obter uma visão detalhada do comportamento do sistema em tempo real, facilitando a identificação de falhas e gargalos. Esta foi minha primeira experiência com a ferramenta e achei interessante adiciona-lá ao projeto. 
(Print-screen do end-point)

- Dashboards de visualização com Grafana: Complementando o uso do Prometheus e meu primeiro contato com a ferramenta, o Grafana foi integrado ao projeto para possibilitar a visualização gráfica e interativa das métricas coletadas através da URL *https://grafana-4q44.onrender.com/login* com deploy também feito no Render. Com dashboards personalizáveis, foi possível obter insights visuais sobre a performance e funcionamento da aplicação, tornando o monitoramento mais intuitivo e acessível.
(print-screen do grafana)

## Conclusão
A fase 02 da pós-tech de Full Stack Development representou um desafio significativo para mim devido a complexidade de lidar com novas tecnologias, assimilar o conhecimento das aulas e ainda honrar com o prazo de desenvolvimento do projeto.

A estrutura da aplicação foi planejada com foco em boas práticas de arquitetura de software, garantindo uma separação clara entre camadas — desde o recebimento das requisições no controller até a persistência dos dados no banco PostgreSQL. Tecnologias como Express, ZOD, JWT, Bcrypt, Swagger, Prometheus, Grafana e Docker foram integradas na aplicação em diferentes partes do projeto, garantindo robustez, segurança, escalabilidade e observabilidade. Pilares ensinados durante as aulas desta fase.

Além do backend funcional, implementei uma pipeline completa de CI/CD com GitHub Actions, configurando o ambiente de testes automatizados e o processo de build e deploy contínuo. O uso do DockerHub e o deploy final via Render consolidaram o ciclo DevOps da aplicação, permitindo uma entrega prática e funcional em ambiente de produção.

Apesar das dificuldades, todos os requisitos técnicos foram atendidos com sucesso. Fui além do escopo obrigatório ao adicionar ferramentas de monitoramento e segurança, com o foco em construir uma solução completa, com atenção à performance, qualidade do código e manutenção futura no possível viável.

Encerrar esta etapa com uma entrega robusta e tecnicamente madura é motivo de satisfação profissional.