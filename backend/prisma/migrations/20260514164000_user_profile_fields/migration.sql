-- AlterTable
ALTER TABLE `users`
  ADD COLUMN `cpf` VARCHAR(191) NULL,
  ADD COLUMN `telefone` VARCHAR(191) NULL,
  ADD COLUMN `cidade` VARCHAR(191) NULL,
  ADD COLUMN `estado` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_cpf_key` ON `users`(`cpf`);
