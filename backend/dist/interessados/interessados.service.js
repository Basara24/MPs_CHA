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
exports.InteressadosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const terrenos_service_1 = require("../terrenos/terrenos.service");
let InteressadosService = class InteressadosService {
    prisma;
    terrenosService;
    constructor(prisma, terrenosService) {
        this.prisma = prisma;
        this.terrenosService = terrenosService;
    }
    async create(terrenoId, clienteId, dto) {
        await this.terrenosService.findOne(terrenoId);
        return this.prisma.interesse.create({
            data: {
                terrenoId,
                clienteId,
                mensagem: dto.mensagem,
            },
        });
    }
    listByTerreno(terrenoId) {
        return this.prisma.interesse.findMany({
            where: { terrenoId },
            include: {
                cliente: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.InteressadosService = InteressadosService;
exports.InteressadosService = InteressadosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        terrenos_service_1.TerrenosService])
], InteressadosService);
//# sourceMappingURL=interessados.service.js.map