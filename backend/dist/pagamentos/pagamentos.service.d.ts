import { PrismaService } from '../prisma/prisma.service';
import { RegistrarPagamentoDto } from './dto/registrar-pagamento.dto';
export declare class PagamentosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByContrato(contratoId: number): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        valor: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.PagamentoStatus;
        contratoId: number;
        dataVencimento: Date;
        dataPagamento: Date | null;
    }[]>;
    registrarPagamento(id: number, dto: RegistrarPagamentoDto): Promise<{
        id: number;
        valor: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.PagamentoStatus;
        contratoId: number;
        dataVencimento: Date;
        dataPagamento: Date | null;
    }>;
    updatePagamentosAtrasados(): Promise<void>;
    getInadimplencia(): Promise<{
        total: number;
        itens: ({
            contrato: {
                terreno: {
                    id: number;
                    titulo: string;
                };
                cliente: {
                    email: string;
                    nome: string;
                    id: number;
                };
            } & {
                id: number;
                createdAt: Date;
                status: import("@prisma/client").$Enums.ContratoStatus;
                terrenoId: number;
                clienteId: number;
                vendedorId: number;
                valorTotal: import("@prisma/client/runtime/library").Decimal;
                dataInicio: Date;
            };
        } & {
            id: number;
            valor: import("@prisma/client/runtime/library").Decimal;
            status: import("@prisma/client").$Enums.PagamentoStatus;
            contratoId: number;
            dataVencimento: Date;
            dataPagamento: Date | null;
        })[];
    }>;
}
