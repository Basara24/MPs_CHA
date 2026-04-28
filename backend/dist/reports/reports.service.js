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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async vendasCsv() {
        const contratos = await this.prisma.contrato.findMany({
            include: {
                cliente: { select: { nome: true, email: true } },
                vendedor: { select: { nome: true } },
                terreno: { select: { titulo: true, cidade: true, estado: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        const header = 'id,cliente,vendedor,terreno,cidade,estado,valor_total,status,data_inicio';
        const rows = contratos.map((contrato) => [
            contrato.id,
            contrato.cliente.nome,
            contrato.vendedor.nome,
            contrato.terreno.titulo,
            contrato.terreno.cidade,
            contrato.terreno.estado,
            Number(contrato.valorTotal),
            contrato.status,
            contrato.dataInicio.toISOString(),
        ].join(','));
        return [header, ...rows].join('\n');
    }
    async inadimplenciaCsv() {
        const pagamentos = await this.prisma.pagamento.findMany({
            where: { status: client_1.PagamentoStatus.ATRASADO },
            include: {
                contrato: {
                    include: {
                        cliente: { select: { nome: true, email: true } },
                    },
                },
            },
            orderBy: { dataVencimento: 'asc' },
        });
        const header = 'pagamento_id,contrato_id,cliente,cliente_email,valor,vencimento,status';
        const rows = pagamentos.map((pagamento) => [
            pagamento.id,
            pagamento.contratoId,
            pagamento.contrato.cliente.nome,
            pagamento.contrato.cliente.email,
            Number(pagamento.valor),
            pagamento.dataVencimento.toISOString(),
            pagamento.status,
        ].join(','));
        return [header, ...rows].join('\n');
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map