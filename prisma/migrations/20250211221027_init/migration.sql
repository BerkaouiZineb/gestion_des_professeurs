/*
  Warnings:

  - You are about to drop the column `createdAt` on the `professeur` table. All the data in the column will be lost.
  - Added the required column `password` to the `Professeur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenom` to the `Professeur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `professeur` DROP COLUMN `createdAt`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `prenom` VARCHAR(191) NOT NULL,
    MODIFY `photo` VARCHAR(191) NULL;
