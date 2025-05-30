/*
  Warnings:

  - You are about to drop the column `createdAt` on the `tournament` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `tournament` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tournament` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `tournament` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tournament` table. All the data in the column will be lost.
  - You are about to drop the `_tournamentequipe` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Date` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_tournamentequipe` DROP FOREIGN KEY `_TournamentEquipe_A_fkey`;

-- DropForeignKey
ALTER TABLE `_tournamentequipe` DROP FOREIGN KEY `_TournamentEquipe_B_fkey`;

-- DropIndex
DROP INDEX `Tournament_name_key` ON `tournament`;

-- AlterTable
ALTER TABLE `tournament` DROP COLUMN `createdAt`,
    DROP COLUMN `endDate`,
    DROP COLUMN `name`,
    DROP COLUMN `startDate`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `Date` DATETIME(3) NOT NULL,
    ADD COLUMN `createdById` INTEGER NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_tournamentequipe`;

-- CreateTable
CREATE TABLE `_TournamentEquipes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TournamentEquipes_AB_unique`(`A`, `B`),
    INDEX `_TournamentEquipes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Tournament_title_key` ON `Tournament`(`title`);

-- AddForeignKey
ALTER TABLE `Tournament` ADD CONSTRAINT `Tournament_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TournamentEquipes` ADD CONSTRAINT `_TournamentEquipes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Equipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TournamentEquipes` ADD CONSTRAINT `_TournamentEquipes_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tournament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
