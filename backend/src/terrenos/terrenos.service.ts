import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTerrenoDto } from './dto/create-terreno.dto';
import { FilterTerrenoDto } from './dto/filter-terreno.dto';
import { UpdateTerrenoDto } from './dto/update-terreno.dto';

@Injectable()
export class TerrenosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTerrenoDto, createdBy: number) {
    return this.prisma.terreno.create({
      data: {
        ...dto,
        createdBy,
      },
      include: { imagens: true },
    });
  }

  findAll(filters: FilterTerrenoDto) {
    return this.prisma.terreno.findMany({
      where: {
        cidade: filters.cidade ? { contains: filters.cidade } : undefined,
        status: filters.status,
        valor: {
          gte: filters.precoMin,
          lte: filters.precoMax,
        },
        tamanho: {
          gte: filters.tamanhoMin,
          lte: filters.tamanhoMax,
        },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        imagens: true,
        criador: { select: { id: true, nome: true, email: true } },
      },
    });
  }

  async findOne(id: number) {
    const terreno = await this.prisma.terreno.findUnique({
      where: { id },
      include: { imagens: true, criador: { select: { id: true, nome: true } } },
    });
    if (!terreno) {
      throw new NotFoundException('Terreno não encontrado');
    }
    return terreno;
  }

  async update(id: number, dto: UpdateTerrenoDto) {
    await this.findOne(id);
    return this.prisma.terreno.update({
      where: { id },
      data: dto,
      include: { imagens: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.terreno.delete({ where: { id } });
    return { message: 'Terreno removido com sucesso' };
  }

  async addImages(terrenoId: number, files: Express.Multer.File[]) {
    await this.findOne(terrenoId);
    if (!files.length) {
      return [];
    }

    return this.prisma.$transaction(
      files.map((file) =>
        this.prisma.terrenoImagem.create({
          data: {
            terrenoId,
            url: `/uploads/${file.filename}`,
          },
        }),
      ),
    );
  }
}
