import { PrismaService } from '../prisma/prisma.service';
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    vendasCsv(): Promise<string>;
    inadimplenciaCsv(): Promise<string>;
}
