"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getKpis() {
        const [totalVendas, parcelasAtrasadas, totalTerrenos, receitaRaw] = await Promise.all([
            this.prisma.contrato.count(),
            this.prisma.pagamento.count({ where: { status: client_1.PagamentoStatus.ATRASADO } }),
            this.prisma.terreno.groupBy({
                by: ['status'],
                _count: { _all: true },
            }),
            this.prisma.pagamento.aggregate({
                where: { status: client_1.PagamentoStatus.PAGO },
                _sum: { valor: true },
            }),
        ]);
        const terrenosDisponiveis = totalTerrenos.find((item) => item.status === client_1.TerrenoStatus.DISPONIVEL)?._count._all ?? 0;
        const terrenosVendidos = totalTerrenos.find((item) => item.status === client_1.TerrenoStatus.VENDIDO)?._count._all ?? 0;
        return {
            totalVendas,
            receita: Number(receitaRaw._sum.valor ?? 0),
            parcelasAtrasadas,
            terrenosDisponiveis,
            terrenosVendidos,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map