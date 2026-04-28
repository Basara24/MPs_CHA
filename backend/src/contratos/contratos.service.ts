import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ContratoStatus, PagamentoStatus, Prisma, TerrenoStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContratoDto } from './dto/create-contrato.dto';

@Injectable()
export class ContratosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContratoDto, vendedorId: number) {
    const [cliente, terreno, vendedor] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: dto.clienteId } }),
      this.prisma.terreno.findUnique({ where: { id: dto.terrenoId } }),
      this.prisma.user.findUnique({ where: { id: vendedorId } }),
    ]);

    if (!cliente) throw new NotFoundException('Cliente não encontrado');
    if (!vendedor) throw new NotFoundException('Vendedor não encontrado');
    if (!terreno) throw new NotFoundException('Terreno não encontrado');
    if (terreno.status !== TerrenoStatus.DISPONIVEL) {
      throw new BadRequestException('Terreno não está disponível para contrato');
    }

    const valorParcela = dto.valorTotal / dto.quantidadeParcelas;
    const primeiraData = new Date(dto.primeiroVencimento);

    return this.prisma.$transaction(async (tx) => {
      const contrato = await tx.contrato.create({
        data: {
          clienteId: dto.clienteId,
          terrenoId: dto.terrenoId,
          vendedorId,
          valorTotal: dto.valorTotal,
          dataInicio: new Date(dto.dataInicio),
          status: ContratoStatus.ATIVO,
        },
      });

      const pagamentosData: Prisma.PagamentoCreateManyInput[] = Array.from(
        { length: dto.quantidadeParcelas },
        (_, index) => {
          const dataVencimento = new Date(primeiraData);
          dataVencimento.setMonth(dataVencimento.getMonth() + index);
          return {
            contratoId: contrato.id,
            valor: valorParcela,
            dataVencimento,
            status: PagamentoStatus.PENDENTE,
          };
        },
      );

      await tx.pagamento.createMany({ data: pagamentosData });
      await tx.terreno.update({
        where: { id: dto.terrenoId },
        data: { status: TerrenoStatus.RESERVADO },
      });

      return tx.contrato.findUnique({
        where: { id: contrato.id },
        include: { pagamentos: true, cliente: true, terreno: true, vendedor: true },
      });
    });
  }

  findAll() {
    return this.prisma.contrato.findMany({
      include: {
        cliente: { select: { id: true, nome: true } },
        vendedor: { select: { id: true, nome: true } },
        terreno: { select: { id: true, titulo: true, status: true } },
        pagamentos: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const contrato = await this.prisma.contrato.findUnique({
      where: { id },
      include: {
        cliente: { select: { id: true, nome: true, email: true } },
        vendedor: { select: { id: true, nome: true } },
        terreno: true,
        pagamentos: true,
      },
    });

    if (!contrato) {
      throw new NotFoundException('Contrato não encontrado');
    }

    return contrato;
  }

  async cancel(id: number) {
    const contrato = await this.findOne(id);
    await this.prisma.$transaction([
      this.prisma.contrato.update({
        where: { id },
        data: { status: ContratoStatus.CANCELADO },
      }),
      this.prisma.terreno.update({
        where: { id: contrato.terrenoId },
        data: { status: TerrenoStatus.DISPONIVEL },
      }),
    ]);
    return { message: 'Contrato cancelado com sucesso' };
  }
}
