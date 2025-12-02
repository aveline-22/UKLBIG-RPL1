/*
  Warnings:

  - You are about to drop the column `nama` on the `mahasiswa` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `mahasiswa` table. All the data in the column will be lost.
  - Added the required column `jenis_kelamin` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_mahasiswa` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mahasiswa` DROP FOREIGN KEY `Mahasiswa_userId_fkey`;

-- DropIndex
DROP INDEX `Mahasiswa_userId_key` ON `mahasiswa`;

-- AlterTable
ALTER TABLE `mahasiswa` DROP COLUMN `nama`,
    DROP COLUMN `userId`,
    ADD COLUMN `id_user` INTEGER NULL,
    ADD COLUMN `jenis_kelamin` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama_mahasiswa` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_id_mahasiswa_fkey` FOREIGN KEY (`id_mahasiswa`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
