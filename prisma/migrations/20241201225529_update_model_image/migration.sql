-- CreateEnum
CREATE TYPE "Style" AS ENUM ('DEFAULT', 'ANIME', 'KANDINSKY', 'UHD');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PROCESSING', 'COMPLETED');

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "style" "Style" NOT NULL DEFAULT 'DEFAULT',
    "originalUrl" TEXT,
    "thumbnailUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'PROCESSING',

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
