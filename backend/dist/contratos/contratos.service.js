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
exports.ContratosService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let ContratosService = class ContratosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, vendedorId) {
        const [cliente, terreno, vendedor] = await Promise.all([
            this.prisma.user.findUnique({ where: { id: dto.clienteId } }),
            this.prisma.terreno.findUnique({ where: { id: dto.terrenoId } }),
            this.prisma.user.findUnique({ where: { id: vendedorId } }),
        ]);
        if (!cliente)
            throw new common_1.NotFoundException('Cliente não encontrado');
        if (!vendedor)
            throw new common_1.NotFoundException('Vendedor não encontrado');
        if (!terreno)
            throw new common_1.NotFoundException('Terreno não encontrado');
        if (terreno.status !== client_1.TerrenoStatus.DISPONIVEL) {
            throw new common_1.BadRequestException('Terreno não está disponível para contrato');
        }
        const valorParcela = dto.valorTotal / dto.quantidadeParcelas;
        const primeiraData = new Date(dto.primeiroVencimento);
        return this.prisma.$transaction(async (tx) => {
            const contrato = await tx.contrato.create({
                data: {
                    clienteId: dto.clienteId,
                    terrenoId: dto.terrenoId,
                    vendedorId,
                    valorTotal: dto.valorTotal,
                    dataInicio: new Date(dto.dataInicio),
                    status: client_1.ContratoStatus.ATIVO,
                },
            });
            const pagamentosData = Array.from({ length: dto.quantidadeParcelas }, (_, index) => {
                const dataVencimento = new Date(primeiraData);
                dataVencimento.setMonth(dataVencimento.getMonth() + index);
                return {
                    contratoId: contrato.id,
                    valor: valorParcela,
                    dataVencimento,
                    status: client_1.PagamentoStatus.PENDENTE,
                };
            });
            await tx.pagamento.createMany({ data: pagamentosData });
            await tx.terreno.update({
                where: { id: dto.terrenoId },
                data: { status: client_1.TerrenoStatus.RESERVADO },
            });
            return tx.contrato.findUnique({
                where: { id: contrato.id },
                include: { pagamentos: true, cliente: true, terreno: true, vendedor: true },
            });
        });
    }
    findAll() {
        return this.prisma.contrato.findMany({
            include: {
                cliente: { select: { id: true, nome: true } },
                vendedor: { select: { id: true, nome: true } },
                terreno: { select: { id: true, titulo: true, status: true } },
                pagamentos: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const contrato = await this.prisma.contrato.findUnique({
            where: { id },
            include: {
                cliente: { select: { id: true, nome: true, email: true } },
                vendedor: { select: { id: true, nome: true } },
                terreno: true,
                pagamentos: true,
            },
        });
        if (!contrato) {
            throw new common_1.NotFoundException('Contrato não encontrado');
        }
        return contrato;
    }
    async cancel(id) {
        const contrato = await this.findOne(id);
        await this.prisma.$transaction([
            this.prisma.contrato.update({
                where: { id },
                data: { status: client_1.ContratoStatus.CANCELADO },
            }),
            this.prisma.terreno.update({
                where: { id: contrato.terrenoId },
                data: { status: client_1.TerrenoStatus.DISPONIVEL },
            }),
        ]);
        return { message: 'Contrato cancelado com sucesso' };
    }
};
exports.ContratosService = ContratosService;
exports.ContratosService = ContratosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContratosService);
//# sourceMappingURL=contratos.service.js.map