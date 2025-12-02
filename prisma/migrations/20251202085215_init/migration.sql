/*
  Warnings:

  - The primary key for the `matakuliah` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dosenId` on the `matakuliah` table. All the data in the column will be lost.
  - You are about to drop the column `id_matkul` on the `matakuliah` table. All the data in the column will be lost.
  - You are about to drop the column `dosenId` on the `penjadwalan` table. All the data in the column will be lost.
  - Added the required column `id_dosen` to the `Matakuliah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_matakuliah` to the `Matakuliah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_dosen` to the `Penjadwalan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `krs` DROP FOREIGN KEY `KRS_matakuliahId_fkey`;

-- DropForeignKey
ALTER TABLE `penjadwalan` DROP FOREIGN KEY `Penjadwalan_dosenId_fkey`;

-- DropForeignKey
ALTER TABLE `penjadwalan` DROP FOREIGN KEY `Penjadwalan_matakuliahId_fkey`;

-- DropIndex
DROP INDEX `KRS_matakuliahId_fkey` ON `krs`;

-- DropIndex
DROP INDEX `Penjadwalan_dosenId_fkey` ON `penjadwalan`;

-- DropIndex
DROP INDEX `Penjadwalan_matakuliahId_fkey` ON `penjadwalan`;

-- AlterTable
ALTER TABLE `matakuliah` DROP PRIMARY KEY,
    DROP COLUMN `dosenId`,
    DROP COLUMN `id_matkul`,
    ADD COLUMN `id_dosen` INTEGER NOT NULL,
    ADD COLUMN `id_matakuliah` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_matakuliah`);

-- AlterTable
ALTER TABLE `penjadwalan` DROP COLUMN `dosenId`,
    ADD COLUMN `id_dosen` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Penjadwalan` ADD CONSTRAINT `Penjadwalan_id_dosen_fkey` FOREIGN KEY (`id_dosen`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penjadwalan` ADD CONSTRAINT `Penjadwalan_matakuliahId_fkey` FOREIGN KEY (`matakuliahId`) REFERENCES `Matakuliah`(`id_matakuliah`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KRS` ADD CONSTRAINT `KRS_matakuliahId_fkey` FOREIGN KEY (`matakuliahId`) REFERENCES `Matakuliah`(`id_matakuliah`) ON DELETE RESTRICT ON UPDATE CASCADE;
