import { Injectable } from '@nestjs/common';
import { PagamentoStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async vendasCsv() {
    const contratos = await this.prisma.contrato.findMany({
      include: {
        cliente: { select: { nome: true, email: true } },
        vendedor: { select: { nome: true } },
        terreno: { select: { titulo: true, cidade: true, estado: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const header = 'id,cliente,vendedor,terreno,cidade,estado,valor_total,status,data_inicio';
    const rows = contratos.map((contrato) =>
      [
        contrato.id,
        contrato.cliente.nome,
        contrato.vendedor.nome,
        contrato.terreno.titulo,
        contrato.terreno.cidade,
        contrato.terreno.estado,
        Number(contrato.valorTotal),
        contrato.status,
        contrato.dataInicio.toISOString(),
      ].join(','),
    );

    return [header, ...rows].join('\n');
  }

  async inadimplenciaCsv() {
    const pagamentos = await this.prisma.pagamento.findMany({
      where: { status: PagamentoStatus.ATRASADO },
      include: {
        contrato: {
          include: {
            cliente: { select: { nome: true, email: true } },
          },
        },
      },
      orderBy: { dataVencimento: 'asc' },
    });

    const header = 'pagamento_id,contrato_id,cliente,cliente_email,valor,vencimento,status';
    const rows = pagamentos.map((pagamento) =>
      [
        pagamento.id,
        pagamento.contratoId,
        pagamento.contrato.cliente.nome,
        pagamento.contrato.cliente.email,
        Number(pagamento.valor),
        pagamento.dataVencimento.toISOString(),
        pagamento.status,
      ].join(','),
    );

    return [header, ...rows].join('\n');
  }
}
