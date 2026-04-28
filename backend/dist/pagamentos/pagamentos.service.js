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
exports.PagamentosService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
let PagamentosService = class PagamentosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    listByContrato(contratoId) {
        return this.prisma.pagamento.findMany({
            where: { contratoId },
            orderBy: { dataVencimento: 'asc' },
        });
    }
    async registrarPagamento(id, dto) {
        const pagamento = await this.prisma.pagamento.findUnique({ where: { id } });
        if (!pagamento) {
            throw new common_1.NotFoundException('Parcela não encontrada');
        }
        const dataPagamento = dto.dataPagamento ? new Date(dto.dataPagamento) : new Date();
        const updated = await this.prisma.pagamento.update({
            where: { id },
            data: {
                dataPagamento,
                status: client_1.PagamentoStatus.PAGO,
            },
        });
        const pendentes = await this.prisma.pagamento.count({
            where: {
                contratoId: pagamento.contratoId,
                status: { in: [client_1.PagamentoStatus.PENDENTE, client_1.PagamentoStatus.ATRASADO] },
            },
        });
        if (pendentes === 0) {
            await this.prisma.contrato.update({
                where: { id: pagamento.contratoId },
                data: { status: client_1.ContratoStatus.FINALIZADO },
            });
        }
        return updated;
    }
    async updatePagamentosAtrasados() {
        await this.prisma.pagamento.updateMany({
            where: {
                status: client_1.PagamentoStatus.PENDENTE,
                dataVencimento: { lt: new Date() },
            },
            data: {
                status: client_1.PagamentoStatus.ATRASADO,
            },
        });
    }
    async getInadimplencia() {
        const atrasados = await this.prisma.pagamento.findMany({
            where: { status: client_1.PagamentoStatus.ATRASADO },
            include: {
                contrato: {
                    include: {
                        cliente: { select: { id: true, nome: true, email: true } },
                        terreno: { select: { id: true, titulo: true } },
                    },
                },
            },
            orderBy: { dataVencimento: 'asc' },
        });
        return {
            total: atrasados.length,
            itens: atrasados,
        };
    }
};
exports.PagamentosService = PagamentosService;
__decorate([
    (0, schedule_1.Cron)('0 1 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagamentosService.prototype, "updatePagamentosAtrasados", null);
exports.PagamentosService = PagamentosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PagamentosService);
//# sourceMappingURL=pagamentos.service.js.map