import { PrismaService } from '../prisma/prisma.service';
import { TerrenosService } from '../terrenos/terrenos.service';
import { CreateInteresseDto } from './dto/create-interesse.dto';
export declare class InteressadosService {
    private readonly prisma;
    private readonly terrenosService;
    constructor(prisma: PrismaService, terrenosService: TerrenosService);
    create(terrenoId: number, clienteId: number, dto: CreateInteresseDto): Promise<{
        id: number;
        createdAt: Date;
        mensagem: string | null;
        terrenoId: number;
        clienteId: number;
    }>;
    listByTerreno(terrenoId: number): import("@prisma/client").Prisma.PrismaPromise<({
        cliente: {
            email: string;
            nome: string;
            id: number;
        };
    } & {
        id: number;
        createdAt: Date;
        mensagem: string | null;
        terrenoId: number;
        clienteId: number;
    })[]>;
}
