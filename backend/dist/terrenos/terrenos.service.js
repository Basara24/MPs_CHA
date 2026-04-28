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
exports.TerrenosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TerrenosService = class TerrenosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto, createdBy) {
        return this.prisma.terreno.create({
            data: {
                ...dto,
                createdBy,
            },
            include: { imagens: true },
        });
    }
    findAll(filters) {
        return this.prisma.terreno.findMany({
            where: {
                cidade: filters.cidade ? { contains: filters.cidade } : undefined,
                status: filters.status,
                valor: {
                    gte: filters.precoMin,
                    lte: filters.precoMax,
                },
                tamanho: {
                    gte: filters.tamanhoMin,
                    lte: filters.tamanhoMax,
                },
            },
            orderBy: { createdAt: 'desc' },
            include: {
                imagens: true,
                criador: { select: { id: true, nome: true, email: true } },
            },
        });
    }
    async findOne(id) {
        const terreno = await this.prisma.terreno.findUnique({
            where: { id },
            include: { imagens: true, criador: { select: { id: true, nome: true } } },
        });
        if (!terreno) {
            throw new common_1.NotFoundException('Terreno não encontrado');
        }
        return terreno;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.terreno.update({
            where: { id },
            data: dto,
            include: { imagens: true },
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.terreno.delete({ where: { id } });
        return { message: 'Terreno removido com sucesso' };
    }
    async addImages(terrenoId, files) {
        await this.findOne(terrenoId);
        if (!files.length) {
            return [];
        }
        return this.prisma.$transaction(files.map((file) => this.prisma.terrenoImagem.create({
            data: {
                terrenoId,
                url: `/uploads/${file.filename}`,
            },
        })));
    }
};
exports.TerrenosService = TerrenosService;
exports.TerrenosService = TerrenosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TerrenosService);
//# sourceMappingURL=terrenos.service.js.map