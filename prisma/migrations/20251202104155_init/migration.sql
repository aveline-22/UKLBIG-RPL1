/*
  Warnings:

  - The primary key for the `krs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `krs` table. All the data in the column will be lost.
  - You are about to drop the column `jadwalId` on the `krs` table. All the data in the column will be lost.
  - You are about to drop the column `mahasiswaId` on the `krs` table. All the data in the column will be lost.
  - You are about to drop the column `matakuliahId` on the `krs` table. All the data in the column will be lost.
  - You are about to drop the column `matakuliahId` on the `penjadwalan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_user]` on the table `Mahasiswa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_jadwal` to the `KRS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_krs` to the `KRS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_mahasiswa` to the `KRS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_matakuliah` to the `KRS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_matakuliah` to the `Penjadwalan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `krs` DROP FOREIGN KEY `KRS_jadwalId_fkey`;

-- DropForeignKey
ALTER TABLE `krs` DROP FOREIGN KEY `KRS_mahasiswaId_fkey`;

-- DropForeignKey
ALTER TABLE `krs` DROP FOREIGN KEY `KRS_matakuliahId_fkey`;

-- DropForeignKey
ALTER TABLE `mahasiswa` DROP FOREIGN KEY `Mahasiswa_id_mahasiswa_fkey`;

-- DropForeignKey
ALTER TABLE `penjadwalan` DROP FOREIGN KEY `Penjadwalan_matakuliahId_fkey`;

-- DropIndex
DROP INDEX `KRS_jadwalId_fkey` ON `krs`;

-- DropIndex
DROP INDEX `KRS_mahasiswaId_fkey` ON `krs`;

-- DropIndex
DROP INDEX `KRS_matakuliahId_fkey` ON `krs`;

-- DropIndex
DROP INDEX `Penjadwalan_matakuliahId_fkey` ON `penjadwalan`;

-- AlterTable
ALTER TABLE `krs` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `jadwalId`,
    DROP COLUMN `mahasiswaId`,
    DROP COLUMN `matakuliahId`,
    ADD COLUMN `id_jadwal` INTEGER NOT NULL,
    ADD COLUMN `id_krs` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `id_mahasiswa` INTEGER NOT NULL,
    ADD COLUMN `id_matakuliah` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_krs`);

-- AlterTable
ALTER TABLE `penjadwalan` DROP COLUMN `matakuliahId`,
    ADD COLUMN `id_matakuliah` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Mahasiswa_id_user_key` ON `Mahasiswa`(`id_user`);

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penjadwalan` ADD CONSTRAINT `Penjadwalan_id_matakuliah_fkey` FOREIGN KEY (`id_matakuliah`) REFERENCES `Matakuliah`(`id_matakuliah`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KRS` ADD CONSTRAINT `KRS_id_mahasiswa_fkey` FOREIGN KEY (`id_mahasiswa`) REFERENCES `Mahasiswa`(`id_mahasiswa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KRS` ADD CONSTRAINT `KRS_id_matakuliah_fkey` FOREIGN KEY (`id_matakuliah`) REFERENCES `Matakuliah`(`id_matakuliah`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KRS` ADD CONSTRAINT `KRS_id_jadwal_fkey` FOREIGN KEY (`id_jadwal`) REFERENCES `Penjadwalan`(`id_jadwal`) ON DELETE RESTRICT ON UPDATE CASCADE;
