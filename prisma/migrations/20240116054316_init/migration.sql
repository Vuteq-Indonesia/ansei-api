-- CreateTable
CREATE TABLE `history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_part` VARCHAR(100) NOT NULL,
    `timestamp` DATE NOT NULL,
    `part_number` VARCHAR(255) NOT NULL,
    `status` VARCHAR(100) NULL,
    `operator` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
