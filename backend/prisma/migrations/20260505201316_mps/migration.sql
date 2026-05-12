-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `tipo` ENUM('CLIENTE', 'ADMIN', 'VENDEDOR') NOT NULL DEFAULT 'CLIENTE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `terrenos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` TEXT NOT NULL,
    `tamanho` DECIMAL(10, 2) NOT NULL,
    `valor` DECIMAL(12, 2) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `status` ENUM('DISPONIVEL', 'RESERVADO', 'VENDIDO') NOT NULL DEFAULT 'DISPONIVEL',
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `terrenos_cidade_idx`(`cidade`),
    INDEX `terrenos_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `terreno_imagens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `terrenoId` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interesses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `terrenoId` INTEGER NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `mensagem` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `interesses_terrenoId_idx`(`terrenoId`),
    INDEX `interesses_clienteId_idx`(`clienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contratos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `terrenoId` INTEGER NOT NULL,
    `vendedorId` INTEGER NOT NULL,
    `valorTotal` DECIMAL(12, 2) NOT NULL,
    `dataInicio` DATETIME(3) NOT NULL,
    `status` ENUM('ATIVO', 'FINALIZADO', 'CANCELADO') NOT NULL DEFAULT 'ATIVO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `contratos_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contratoId` INTEGER NOT NULL,
    `valor` DECIMAL(12, 2) NOT NULL,
    `dataVencimento` DATETIME(3) NOT NULL,
    `dataPagamento` DATETIME(3) NULL,
    `status` ENUM('PENDENTE', 'PAGO', 'ATRASADO') NOT NULL DEFAULT 'PENDENTE',

    INDEX `pagamentos_status_idx`(`status`),
    INDEX `pagamentos_dataVencimento_idx`(`dataVencimento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `terrenos` ADD CONSTRAINT `terrenos_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `terreno_imagens` ADD CONSTRAINT `terreno_imagens_terrenoId_fkey` FOREIGN KEY (`terrenoId`) REFERENCES `terrenos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interesses` ADD CONSTRAINT `interesses_terrenoId_fkey` FOREIGN KEY (`terrenoId`) REFERENCES `terrenos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interesses` ADD CONSTRAINT `interesses_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contratos` ADD CONSTRAINT `contratos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contratos` ADD CONSTRAINT `contratos_terrenoId_fkey` FOREIGN KEY (`terrenoId`) REFERENCES `terrenos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contratos` ADD CONSTRAINT `contratos_vendedorId_fkey` FOREIGN KEY (`vendedorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pagamentos` ADD CONSTRAINT `pagamentos_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `contratos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
