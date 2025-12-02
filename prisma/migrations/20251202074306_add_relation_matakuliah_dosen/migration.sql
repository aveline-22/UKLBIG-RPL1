/*
  Warnings:

  - The primary key for the `dosen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dosenId` on the `dosen` table. All the data in the column will be lost.
  - Added the required column `id` to the `Dosen` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `penjadwalan` DROP FOREIGN KEY `Penjadwalan_dosenId_fkey`;

-- DropIndex
DROP INDEX `Penjadwalan_dosenId_fkey` ON `penjadwalan`;

-- AlterTable
ALTER TABLE `dosen` DROP PRIMARY KEY,
    DROP COLUMN `dosenId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Penjadwalan` ADD CONSTRAINT `Penjadwalan_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
