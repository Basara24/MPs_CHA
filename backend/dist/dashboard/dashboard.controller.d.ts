import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getKpis(): Promise<{
        totalVendas: number;
        receita: number;
        parcelasAtrasadas: number;
        terrenosDisponiveis: number;
        terrenosVendidos: number;
    }>;
}
