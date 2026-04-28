import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TerrenosService } from '../terrenos/terrenos.service';
import { CreateInteresseDto } from './dto/create-interesse.dto';

@Injectable()
export class InteressadosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly terrenosService: TerrenosService,
  ) {}

  async create(terrenoId: number, clienteId: number, dto: CreateInteresseDto) {
    await this.terrenosService.findOne(terrenoId);
    return this.prisma.interesse.create({
      data: {
        terrenoId,
        clienteId,
        mensagem: dto.mensagem,
      },
    });
  }

  listByTerreno(terrenoId: number) {
    return this.prisma.interesse.findMany({
      where: { terrenoId },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
