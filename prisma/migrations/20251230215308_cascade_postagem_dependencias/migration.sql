-- DropForeignKey
ALTER TABLE "public"."CH_comentario" DROP CONSTRAINT "CH_comentario_postagemID_fkey";

-- DropForeignKey
ALTER TABLE "public"."CH_curtidas" DROP CONSTRAINT "CH_curtidas_postagemID_fkey";

-- DropForeignKey
ALTER TABLE "public"."CH_postagem" DROP CONSTRAINT "CH_postagem_autorID_fkey";

-- AddForeignKey
ALTER TABLE "public"."CH_postagem" ADD CONSTRAINT "CH_postagem_autorID_fkey" FOREIGN KEY ("autorID") REFERENCES "public"."CH_usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CH_curtidas" ADD CONSTRAINT "CH_curtidas_postagemID_fkey" FOREIGN KEY ("postagemID") REFERENCES "public"."CH_postagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CH_comentario" ADD CONSTRAINT "CH_comentario_postagemID_fkey" FOREIGN KEY ("postagemID") REFERENCES "public"."CH_postagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
