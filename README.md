# Chronos - Projeto

## Sumário
1. Membro do Grupo 52 
2. Definição do Projeto  
3. Requisitos Técnicos 
4. Requisitos Funcionais 
5. Fluxograma  
6. Configuração de ambiente
7. Estrutura da aplicação 
8. Processo de Desenvolvimento  
9. Relatos dos Desafios Superados  
10. Entregas  
11. Bônus
12. Conclusão

## Membro do Grupo 52
- Gustavo Rocha - RM365401

## Definição do Projeto
O projeto **Chronos** consiste em uma plataforma de postagem de conteúdo voltada para docentes e alunos, permitindo centralizar informações acadêmicas através possibilitando criar, editar, visualizar e buscar postagens.

## Requisitos Técnicos

- **Back-end em Node.js**  
  - Implementação do servidor utilizando Node.js  
  - Uso do framework Express para roteamento e middleware  

- **Persistência de Dados**  
  - Utilização de banco de dados (MongoDB ou PostgreSQL)  
  - Implementação de modelos de dados adequados para postagens  

- **Containerização com Docker**  
  - Desenvolvimento e deploy com contêineres Docker para consistência de ambiente  

- **Automação com GitHub Actions**  
  - Workflows de CI/CD para testes automáticos e deploy  

- **Documentação**  
  - Guia de setup inicial, arquitetura da aplicação e uso das APIs  

- **Cobertura de Testes**  
  - Garantir pelo menos 20% do código coberto por testes unitários, especialmente em funções críticas como criação, edição e exclusão de postagens  


## Requisitos Funcionais

### Endpoints da API

### Endpoints de alunos:
- **GET /posts** - Lista de Posts  
  Permite aos alunos visualizarem todos os posts disponíveis na página principal.

- **GET /posts/:id** - Leitura de Postagens  
  Permite acessar o conteúdo completo de um post específico pelo ID.

### Endpoints de professores:
- **POST /posts** - Criação de Postagens  
  Permite que docentes criem novas postagens. Aceita dados como título, conteúdo e autor no corpo da requisição.

- **PUT /posts/:id** - Edição de Postagens  
  Permite editar uma postagem existente. É necessário fornecer o ID do post e os novos dados no corpo da requisição.

- **GET /posts** - Listagem de Todas as Postagens  
  Permite que professores vejam todas as postagens criadas, facilitando a gestão do conteúdo.

- **DELETE /posts/:id** - Exclusão de Postagens  
  Permite que docentes excluam uma postagem específica usando o ID do post como parâmetro.

- **GET /posts/search** - Busca de Postagens  
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

## Configuração de ambiente.

Recomenda-se que os pré-requisitos de instalação de tecnologia em seu ambiente de execução sejam os seguintes, listados abaixo. Após verificar as tecnologicas instaladas, siga o procedimento em seguida para inicializar o projeto.

- Node.js: v18.19.1
- Docker: 28.3.2
- Git: 2.43.0

1. Clonar o repositório disponível no GitHub através do link: https://github.com/MyNameIsGustavo/TechChallengeFase2.git

2. Criar um arquivo ".env" e um ".env.local" na raiz do projeto e preencher as chaves conforme ".envExemplo" já disponibilizado originalmente no projeto.

3. Criar um arquivo ".gitignore" na raiz do projeto, incluindo: /node_modules, .env, /src/generated/prisma.

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
- Planejamento das funcionalidades  
- Definição das tecnologias e arquitetura  
- Implementação incremental das APIs e banco de dados  
- Testes unitários e integração contínua  

## Relatos dos Desafios Superados
- Gustavo Rocha - RM365401: Durante a Fase 02 da pós-tech da FIAP, focada em Back-end e Qualidade, enfrentei diversos obstáculos, que consegui superar. Entre as principais dificuldades, a aprendizagem de novos conceitos e tecnologias em um curto período de tempo, como por exemplo: Docker, CI/CD no GitHub Actions, integração com o banco PostgreSQL no Render, Prometheus, Grafana e testes unitários.

Configuração de ambiente do Docker: A configuração inicial do Docker/WSL (Linux), dockerfile e o docker-compose com sua integração com o projeto foi desafiadora. Precisei refazer o processo várias vezes para compreender plenamente seu funcionamento.

Pipeline de projeto: Foi meu primeiro contato com o GitHub Actions para CI/CD. Nesse processo, executei múltiplos testes até identificar e corrigir erros, garantindo o funcionamento correto da pipeline.

Processo de configuração do banco de dados: No início, utilizei o banco PostgreSQL localmente. Porém, no momento final do projeto, durante o deploy da aplicação, percebi que o banco precisava estar disponível no Render para acesso pela API. Esse foi um desafio significativo, pois foi minha primeira experiência com essa situação.

Gerenciamento de logs: O Prometheus e o Grafana também foram conceitos novos para mim nesta fase. Foi muito gratificante conseguir adicioná-los ao projeto, especialmente considerando que estavam fora do escopo técnico inicial — representando um diferencial adicional entregue.

Qualidade do código: Os testes unitários demandaram mais tempo de desenvolvimento, pois tratam-se de um tema muito extenso. Precisei estudar profundamente sobre o assunto e apliquei a técnica dos três A's (Arrange, Act, Assert) para criar testes padronizados e consistentes na aplicação garantindo o mínimo solicitado no escopo técnico de um coverage de, no mínimo, 20% da aplicação.

Conciliar o aprendizado e aplicação desses conteúdos com o período da Fase 02 foi um grande desafio. No entanto, apesar das dificuldades, finalizei o projeto entregando todos os requisitos técnicos previstos, além de adicionar tecnologias e funcionalidades extras que enriqueceram a entrega final.

## Entregas

- **Apresentação em vídeo gravado**  
- **Código-fonte do projeto**  
- **Arquivos utilizados na apresentação**  

## Bônus

- Administrador Postgrees (PgAdmin);
- Criptografia de senhas utilizando o bcrypt;
- Autenticação utilizando JsonWebToken;
- CRUD de usuários;
- CRUD de papéis de usuários;
- Gerenciamento de Log's com Prometheus;
- Dashboards de visualização com Grafana;

## Conclusão
