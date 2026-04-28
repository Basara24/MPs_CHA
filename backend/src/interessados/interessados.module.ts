import { Module } from '@nestjs/common';
import { InteressadosController } from './interessados.controller';
import { InteressadosService } from './interessados.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TerrenosModule } from '../terrenos/terrenos.module';

@Module({
  imports: [PrismaModule, TerrenosModule],
  controllers: [InteressadosController],
  providers: [InteressadosService],
})
export class InteressadosModule {}
