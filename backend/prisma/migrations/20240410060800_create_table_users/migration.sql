-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(30) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `name` VARCHAR(60) NOT NULL,
    `token` VARCHAR(60) NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
