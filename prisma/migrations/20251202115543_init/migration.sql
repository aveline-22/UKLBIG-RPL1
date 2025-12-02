/*
  Warnings:

  - You are about to drop the column `hari` on the `penjadwalan` table. All the data in the column will be lost.
  - You are about to drop the column `jam_mulai` on the `penjadwalan` table. All the data in the column will be lost.
  - You are about to drop the column `jam_selesai` on the `penjadwalan` table. All the data in the column will be lost.
  - You are about to drop the column `ruang` on the `penjadwalan` table. All the data in the column will be lost.
  - Added the required column `jadwal` to the `Penjadwalan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `penjadwalan` DROP COLUMN `hari`,
    DROP COLUMN `jam_mulai`,
    DROP COLUMN `jam_selesai`,
    DROP COLUMN `ruang`,
    ADD COLUMN `jadwal` VARCHAR(191) NOT NULL;
