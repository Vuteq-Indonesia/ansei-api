-- CreateTable
CREATE TABLE `raw_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `vendorCode` VARCHAR(191) NOT NULL,
    `vendorName` VARCHAR(191) NOT NULL,
    `receivingArea` VARCHAR(191) NOT NULL,
    `deliveryDate` DATETIME(3) NOT NULL,
    `deliveryPeriod` INTEGER NOT NULL,
    `firm` VARCHAR(191) NOT NULL,
    `classification` VARCHAR(191) NOT NULL,
    `poNumber` VARCHAR(191) NOT NULL,
    `item` INTEGER NOT NULL,
    `partsNumber` VARCHAR(191) NOT NULL,
    `partsName` VARCHAR(191) NOT NULL,
    `orderQuantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
