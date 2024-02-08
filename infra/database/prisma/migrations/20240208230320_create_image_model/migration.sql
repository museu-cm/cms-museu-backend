-- CreateTable
CREATE TABLE `images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash` VARCHAR(191) NOT NULL,
    `file_name` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `images_hash_key`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
