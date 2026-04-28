import { Injectable, NotFoundException } from '@nestjs/common';
import { ContratoStatus, PagamentoStatus } from '@prisma/client';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { RegistrarPagamentoDto } from './dto/registrar-pagamento.dto';

@Injectable()
export class PagamentosService {
  constructor(private readonly prisma: PrismaService) {}

  listByContrato(contratoId: number) {
    return this.prisma.pagamento.findMany({
      where: { contratoId },
      orderBy: { dataVencimento: 'asc' },
    });
  }

  async registrarPagamento(id: number, dto: RegistrarPagamentoDto) {
    const pagamento = await this.prisma.pagamento.findUnique({ where: { id } });
    if (!pagamento) {
      throw new NotFoundException('Parcela não encontrada');
    }

    const dataPagamento = dto.dataPagamento ? new Date(dto.dataPagamento) : new Date();

    const updated = await this.prisma.pagamento.update({
      where: { id },
      data: {
        dataPagamento,
        status: PagamentoStatus.PAGO,
      },
    });

    const pendentes = await this.prisma.pagamento.count({
      where: {
        contratoId: pagamento.contratoId,
        status: { in: [PagamentoStatus.PENDENTE, PagamentoStatus.ATRASADO] },
      },
    });

    if (pendentes === 0) {
      await this.prisma.contrato.update({
        where: { id: pagamento.contratoId },
        data: { status: ContratoStatus.FINALIZADO },
      });
    }

    return updated;
  }

  @Cron('0 1 * * *')
  async updatePagamentosAtrasados() {
    await this.prisma.pagamento.updateMany({
      where: {
        status: PagamentoStatus.PENDENTE,
        dataVencimento: { lt: new Date() },
      },
      data: {
        status: PagamentoStatus.ATRASADO,
      },
    });
  }

  async getInadimplencia() {
    const atrasados = await this.prisma.pagamento.findMany({
      where: { status: PagamentoStatus.ATRASADO },
      include: {
        contrato: {
          include: {
            cliente: { select: { id: true, nome: true, email: true } },
            terreno: { select: { id: true, titulo: true } },
          },
        },
      },
      orderBy: { dataVencimento: 'asc' },
    });

    return {
      total: atrasados.length,
      itens: atrasados,
    };
  }
}
