import { CreateContratoDto } from './dto/create-contrato.dto';
import { ContratosService } from './contratos.service';
export declare class ContratosController {
    private readonly contratosService;
    constructor(contratosService: ContratosService);
    create(dto: CreateContratoDto, user: {
        sub: number;
    }): Promise<({
        terreno: {
            id: number;
            createdAt: Date;
            titulo: string;
            descricao: string;
            tamanho: import("@prisma/client/runtime/library").Decimal;
            valor: import("@prisma/client/runtime/library").Decimal;
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
            valor: import("@prisma/client/runtime/library").Decimal;
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
        valorTotal: import("@prisma/client/runtime/library").Decimal;
        dataInicio: Date;
    }) | null>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
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
            valor: import("@prisma/client/runtime/library").Decimal;
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
        valorTotal: import("@prisma/client/runtime/library").Decimal;
        dataInicio: Date;
    })[]>;
    findOne(id: number): Promise<{
        terreno: {
            id: number;
            createdAt: Date;
            titulo: string;
            descricao: string;
            tamanho: import("@prisma/client/runtime/library").Decimal;
            valor: import("@prisma/client/runtime/library").Decimal;
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
            valor: import("@prisma/client/runtime/library").Decimal;
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
        valorTotal: import("@prisma/client/runtime/library").Decimal;
        dataInicio: Date;
    }>;
    cancel(id: number): Promise<{
        message: string;
    }>;
}
