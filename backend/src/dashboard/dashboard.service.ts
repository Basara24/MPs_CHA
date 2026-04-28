import { Injectable } from '@nestjs/common';
import { PagamentoStatus, TerrenoStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getKpis() {
    const [totalVendas, parcelasAtrasadas, totalTerrenos, receitaRaw] = await Promise.all([
      this.prisma.contrato.count(),
      this.prisma.pagamento.count({ where: { status: PagamentoStatus.ATRASADO } }),
      this.prisma.terreno.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      this.prisma.pagamento.aggregate({
        where: { status: PagamentoStatus.PAGO },
        _sum: { valor: true },
      }),
    ]);

    const terrenosDisponiveis =
      totalTerrenos.find((item) => item.status === TerrenoStatus.DISPONIVEL)?._count._all ?? 0;
    const terrenosVendidos =
      totalTerrenos.find((item) => item.status === TerrenoStatus.VENDIDO)?._count._all ?? 0;

    return {
      totalVendas,
      receita: Number(receitaRaw._sum.valor ?? 0),
      parcelasAtrasadas,
      terrenosDisponiveis,
      terrenosVendidos,
    };
  }
}
