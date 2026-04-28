import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
export declare class ContratosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateContratoDto, vendedorId: number): Promise<({
        terreno: {
            id: number;
            createdAt: Date;
            titulo: string;
            descricao: string;
            tamanho: Prisma.Decimal;
            valor: Prisma.Decimal;
            cidade: string;
            estado: string;
            status: import("@prisma/client").$Enums.TerrenoStatus;
            createdBy: number;
        };
        cliente: {
            email: string;
            senha: string;
            nome: string;
            tipo: import("@prisma/client").$Enums.UserType;
            id: number;
            createdAt: Date;
        };
        vendedor: {
            email: string;
            senha: string;
            nome: string;
            tipo: import("@prisma/client").$Enums.UserType;
            id: number;
            createdAt: Date;
        };
        pagamentos: {
            id: number;
            valor: Prisma.Decimal;
            status: import("@prisma/client").$Enums.PagamentoStatus;
            contratoId: number;
            dataVencimento: Date;
            dataPagamento: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.ContratoStatus;
        terrenoId: number;
        clienteId: number;
        vendedorId: number;
        valorTotal: Prisma.Decimal;
        dataInicio: Date;
    }) | null>;
    findAll(): Prisma.PrismaPromise<({
        terreno: {
            id: number;
            titulo: string;
            status: import("@prisma/client").$Enums.TerrenoStatus;
        };
        cliente: {
            nome: string;
            id: number;
        };
        vendedor: {
            nome: string;
            id: number;
        };
        pagamentos: {
            id: number;
            valor: Prisma.Decimal;
            status: import("@prisma/client").$Enums.PagamentoStatus;
            contratoId: number;
            dataVencimento: Date;
            dataPagamento: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.ContratoStatus;
        terrenoId: number;
        clienteId: number;
        vendedorId: number;
        valorTotal: Prisma.Decimal;
        dataInicio: Date;
    })[]>;
    findOne(id: number): Promise<{
        terreno: {
            id: number;
            createdAt: Date;
            titulo: string;
            descricao: string;
            tamanho: Prisma.Decimal;
            valor: Prisma.Decimal;
            cidade: string;
            estado: string;
            status: import("@prisma/client").$Enums.TerrenoStatus;
            createdBy: number;
        };
        cliente: {
            email: string;
            nome: string;
            id: number;
        };
        vendedor: {
            nome: string;
            id: number;
        };
        pagamentos: {
            id: number;
            valor: Prisma.Decimal;
            status: import("@prisma/client").$Enums.PagamentoStatus;
            contratoId: number;
            dataVencimento: Date;
            dataPagamento: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.ContratoStatus;
        terrenoId: number;
        clienteId: number;
        vendedorId: number;
        valorTotal: Prisma.Decimal;
        dataInicio: Date;
    }>;
    cancel(id: number): Promise<{
        message: string;
    }>;
}
