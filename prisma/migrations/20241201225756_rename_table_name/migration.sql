/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "style" "Style" NOT NULL DEFAULT 'DEFAULT',
    "original_url" TEXT,
    "thumbnail_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'PROCESSING',

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);
