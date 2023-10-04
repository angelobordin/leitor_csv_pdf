-- CreateTable
CREATE TABLE `lote` (
    `id` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `ativo` BOOLEAN NULL,
    `criado_em` DATETIME(3) NULL,

    UNIQUE INDEX `lote_nome_key`(`nome`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boleto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_sacado` VARCHAR(255) NULL,
    `lote_nome` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `linha_digitavel` VARCHAR(255) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `criado_em` DATETIME(3) NOT NULL,

    UNIQUE INDEX `boleto_id_key`(`id`),
    INDEX `lote_nome`(`lote_nome`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `boleto` ADD CONSTRAINT `boleto_lote_nome_fkey` FOREIGN KEY (`lote_nome`) REFERENCES `lote`(`nome`) ON DELETE RESTRICT ON UPDATE CASCADE;
