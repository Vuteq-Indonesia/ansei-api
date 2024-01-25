/*
  Warnings:

  - You are about to alter the column `timestamp` on the `history` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `history` MODIFY `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `raw_data` MODIFY `date` VARCHAR(191) NOT NULL,
    MODIFY `deliveryDate` VARCHAR(191) NOT NULL;
