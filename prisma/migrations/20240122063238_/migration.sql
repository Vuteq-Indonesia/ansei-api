/*
  Warnings:

  - You are about to drop the column `part_number` on the `history` table. All the data in the column will be lost.
  - Added the required column `po_number` to the `history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history` DROP COLUMN `part_number`,
    ADD COLUMN `po_number` VARCHAR(255) NOT NULL;
