/*
  Warnings:

  - A unique constraint covering the columns `[usuarioID,postagemID]` on the table `CH_curtidas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CH_curtidas_usuarioID_postagemID_key" ON "public"."CH_curtidas"("usuarioID", "postagemID");
