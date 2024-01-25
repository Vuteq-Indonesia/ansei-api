/*
  Warnings:

  - The `timestamp` column on the `history` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `history` DROP COLUMN `timestamp`,
    ADD COLUMN `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `raw_data` MODIFY `date` DATETIME NOT NULL,
    MODIFY `deliveryDate` DATETIME NOT NULL;
