/*
  Warnings:

  - You are about to drop the column `equipeId` on the `player` table. All the data in the column will be lost.
  - Added the required column `confirm_password` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `player` DROP FOREIGN KEY `Player_equipeId_fkey`;

-- DropIndex
DROP INDEX `Player_equipeId_fkey` ON `player`;

-- AlterTable
ALTER TABLE `player` DROP COLUMN `equipeId`,
    ADD COLUMN `confirm_password` VARCHAR(191) NOT NULL;
