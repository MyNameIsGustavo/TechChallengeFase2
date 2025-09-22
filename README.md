# Chronos - Projeto

## Sumário
1. Integrantes do Grupo  
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

## Integrantes - Chronos
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
*(Inserir imagem ou link do fluxograma do sistema aqui)*

## Configuração de ambiente.

Recomenda-se que os pré-requisitos de instalação de tecnologia em seu ambiente de execução sejam os seguintes, listados abaixo. Após verificar as tecnologicas instaladas, siga o procedimento em seguida para inicializar o projeto.

- Node.js: v18.19.1
- Docker: 28.3.2
- Git: 2.43.0

1. Clonar o repositório disponível no GitHub através do link: 

2. Criar um arquivo ".env" na raiz do projeto e preencher as chaves conforme ".envExemplo" já disponibilizado originalmente no projeto.

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
- Gustavo Rocha - RM365401:

## Entregas

- **Apresentação em vídeo gravado**  
- **Código-fonte do projeto**  
- **Arquivos utilizados na apresentação**  

## Bônus

- Administrador Postgrees;
- Criptografia de senhas utilizando o bcrypt;
- Autenticação utilizando JsonWebToken;
- CRUD de usuários;
- CRUD de papéis de usuários;

## Conclusão