-- CreateTable
CREATE TABLE `raw_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `po_id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `delivery_date` VARCHAR(191) NOT NULL,
    `part_no` VARCHAR(191) NOT NULL,
    `part_name` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `id_part` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NOT NULL,
    `receiving_area` VARCHAR(191) NOT NULL,
    `po_no` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `bagian_part` VARCHAR(191) NOT NULL,
    `delivery_period` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `po_no` VARCHAR(191) NOT NULL,
    `po_id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `part_no` VARCHAR(191) NOT NULL,
    `operator` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
