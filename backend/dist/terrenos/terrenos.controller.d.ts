import { CreateTerrenoDto } from './dto/create-terreno.dto';
import { FilterTerrenoDto } from './dto/filter-terreno.dto';
import { UpdateTerrenoDto } from './dto/update-terreno.dto';
import { TerrenosService } from './terrenos.service';
export declare class TerrenosController {
    private readonly terrenosService;
    constructor(terrenosService: TerrenosService);
    create(dto: CreateTerrenoDto, user: {
        sub: number;
    }): import("@prisma/client").Prisma.Prisma__TerrenoClient<{
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
    uploadImages(id: number, files: {
        images?: Express.Multer.File[];
    }): Promise<{
        id: number;
        terrenoId: number;
        url: string;
    }[]>;
}
