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
exports.InteressadosController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const create_interesse_dto_1 = require("./dto/create-interesse.dto");
const interessados_service_1 = require("./interessados.service");
let InteressadosController = class InteressadosController {
    interessadosService;
    constructor(interessadosService) {
        this.interessadosService = interessadosService;
    }
    create(terrenoId, user, dto) {
        return this.interessadosService.create(terrenoId, user.sub, dto);
    }
    listByTerreno(terrenoId) {
        return this.interessadosService.listByTerreno(terrenoId);
    }
};
exports.InteressadosController = InteressadosController;
__decorate([
    (0, common_1.Post)('terreno/:terrenoId'),
    (0, roles_decorator_1.Roles)(client_1.UserType.CLIENTE),
    __param(0, (0, common_1.Param)('terrenoId', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, create_interesse_dto_1.CreateInteresseDto]),
    __metadata("design:returntype", void 0)
], InteressadosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('terreno/:terrenoId'),
    (0, roles_decorator_1.Roles)(client_1.UserType.ADMIN, client_1.UserType.VENDEDOR),
    __param(0, (0, common_1.Param)('terrenoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InteressadosController.prototype, "listByTerreno", null);
exports.InteressadosController = InteressadosController = __decorate([
    (0, common_1.Controller)('interessados'),
    __metadata("design:paramtypes", [interessados_service_1.InteressadosService])
], InteressadosController);
//# sourceMappingURL=interessados.controller.js.map