-- CreateTable
CREATE TABLE "public"."CH_usuario" (
    "id" SERIAL NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "papelUsuarioID" INTEGER NOT NULL,

    CONSTRAINT "CH_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CH_papelUsuario" (
    "id" SERIAL NOT NULL,
    "papelUsuario" TEXT NOT NULL,

    CONSTRAINT "CH_papelUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CH_postagem" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "visibilidade" BOOLEAN NOT NULL,
    "dataPublicacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "caminhoImagem" TEXT NOT NULL,
    "autorID" INTEGER NOT NULL,

    CONSTRAINT "CH_postagem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CH_usuario_email_key" ON "public"."CH_usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."CH_usuario" ADD CONSTRAINT "CH_usuario_papelUsuarioID_fkey" FOREIGN KEY ("papelUsuarioID") REFERENCES "public"."CH_papelUsuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CH_postagem" ADD CONSTRAINT "CH_postagem_autorID_fkey" FOREIGN KEY ("autorID") REFERENCES "public"."CH_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
