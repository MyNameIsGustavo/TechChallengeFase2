-- CreateTable
CREATE TABLE "public"."CH_curtidas" (
    "id" SERIAL NOT NULL,
    "usuarioID" INTEGER NOT NULL,
    "postagemID" INTEGER NOT NULL,

    CONSTRAINT "CH_curtidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CH_comentario" (
    "id" SERIAL NOT NULL,
    "conteudo" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioID" INTEGER NOT NULL,
    "postagemID" INTEGER NOT NULL,

    CONSTRAINT "CH_comentario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CH_curtidas" ADD CONSTRAINT "CH_curtidas_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "public"."CH_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CH_curtidas" ADD CONSTRAINT "CH_curtidas_postagemID_fkey" FOREIGN KEY ("postagemID") REFERENCES "public"."CH_postagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CH_comentario" ADD CONSTRAINT "CH_comentario_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "public"."CH_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CH_comentario" ADD CONSTRAINT "CH_comentario_postagemID_fkey" FOREIGN KEY ("postagemID") REFERENCES "public"."CH_postagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
