import { CreateInteresseDto } from './dto/create-interesse.dto';
import { InteressadosService } from './interessados.service';
export declare class InteressadosController {
    private readonly interessadosService;
    constructor(interessadosService: InteressadosService);
    create(terrenoId: number, user: {
        sub: number;
    }, dto: CreateInteresseDto): Promise<{
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
