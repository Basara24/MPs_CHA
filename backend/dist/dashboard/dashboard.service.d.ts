import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getKpis(): Promise<{
        totalVendas: number;
        receita: number;
        parcelasAtrasadas: number;
        terrenosDisponiveis: number;
        terrenosVendidos: number;
    }>;
}
