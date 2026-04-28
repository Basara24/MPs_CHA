import { PrismaService } from '../prisma/prisma.service';
import { CreateTerrenoDto } from './dto/create-terreno.dto';
import { FilterTerrenoDto } from './dto/filter-terreno.dto';
import { UpdateTerrenoDto } from './dto/update-terreno.dto';
export declare class TerrenosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTerrenoDto, createdBy: number): import("@prisma/client").Prisma.Prisma__TerrenoClient<{
        imagens: {
            id: number;
            terrenoId: number;
            url: string;
        }[];
    } & {
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(filters: FilterTerrenoDto): import("@prisma/client").Prisma.PrismaPromise<({
        criador: {
            email: string;
            nome: string;
            id: number;
        };
        imagens: {
            id: number;
            terrenoId: number;
            url: string;
        }[];
    } & {
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
    })[]>;
    findOne(id: number): Promise<{
        criador: {
            nome: string;
            id: number;
        };
        imagens: {
            id: number;
            terrenoId: number;
            url: string;
        }[];
    } & {
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
    }>;
    update(id: number, dto: UpdateTerrenoDto): Promise<{
        imagens: {
            id: number;
            terrenoId: number;
            url: string;
        }[];
    } & {
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
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    addImages(terrenoId: number, files: Express.Multer.File[]): Promise<{
        id: number;
        terrenoId: number;
        url: string;
    }[]>;
}
