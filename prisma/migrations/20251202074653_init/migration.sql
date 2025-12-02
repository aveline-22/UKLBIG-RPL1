/*
  Warnings:

  - Added the required column `dosenId` to the `Matakuliah` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `matakuliah` ADD COLUMN `dosenId` INTEGER NOT NULL;
