import { Module } from '@nestjs/common';
import { TerrenosController } from './terrenos.controller';
import { TerrenosService } from './terrenos.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TerrenosController],
  providers: [TerrenosService],
  exports: [TerrenosService],
})
export class TerrenosModule {}
