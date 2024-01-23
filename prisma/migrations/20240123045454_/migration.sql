-- CreateTable
CREATE TABLE `raw_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `vendorCode` VARCHAR(191) NOT NULL,
    `vendorName` VARCHAR(191) NOT NULL,
    `receivingArea` VARCHAR(191) NOT NULL,
    `deliveryDate` DATE NOT NULL,
    `deliveryPeriod` INTEGER NOT NULL,
    `firm` VARCHAR(191) NULL,
    `classification` VARCHAR(191) NULL,
    `poNumber` VARCHAR(191) NULL,
    `item` INTEGER NOT NULL,
    `partsNumber` VARCHAR(191) NOT NULL,
    `partsName` VARCHAR(191) NOT NULL,
    `orderQuantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timestamp` DATE NOT NULL,
    `po_number` VARCHAR(255) NOT NULL,
    `parts_number` VARCHAR(255) NOT NULL,
    `status` VARCHAR(100) NULL,
    `operator` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
