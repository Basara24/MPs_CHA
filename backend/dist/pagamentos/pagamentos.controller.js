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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagamentosController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const registrar_pagamento_dto_1 = require("./dto/registrar-pagamento.dto");
const pagamentos_service_1 = require("./pagamentos.service");
let PagamentosController = class PagamentosController {
    pagamentosService;
    constructor(pagamentosService) {
        this.pagamentosService = pagamentosService;
    }
    listByContrato(contratoId) {
        return this.pagamentosService.listByContrato(contratoId);
    }
    registrarPagamento(id, dto) {
        return this.pagamentosService.registrarPagamento(id, dto);
    }
    getInadimplencia() {
        return this.pagamentosService.getInadimplencia();
    }
};
exports.PagamentosController = PagamentosController;
__decorate([
    (0, common_1.Get)('contrato/:contratoId'),
    __param(0, (0, common_1.Param)('contratoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PagamentosController.prototype, "listByContrato", null);
__decorate([
    (0, common_1.Patch)(':id/pagar'),
    (0, roles_decorator_1.Roles)(client_1.UserType.ADMIN, client_1.UserType.VENDEDOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, registrar_pagamento_dto_1.RegistrarPagamentoDto]),
    __metadata("design:returntype", void 0)
], PagamentosController.prototype, "registrarPagamento", null);
__decorate([
    (0, common_1.Get)('inadimplencia/resumo'),
    (0, roles_decorator_1.Roles)(client_1.UserType.ADMIN, client_1.UserType.VENDEDOR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PagamentosController.prototype, "getInadimplencia", null);
exports.PagamentosController = PagamentosController = __decorate([
    (0, common_1.Controller)('pagamentos'),
    __metadata("design:paramtypes", [pagamentos_service_1.PagamentosService])
], PagamentosController);
//# sourceMappingURL=pagamentos.controller.js.map