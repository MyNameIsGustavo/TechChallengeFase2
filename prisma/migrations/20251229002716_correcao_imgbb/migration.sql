/*
  Warnings:

  - Added the required column `hashImagem` to the `CH_postagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CH_postagem" ADD COLUMN     "hashImagem" TEXT NOT NULL;
