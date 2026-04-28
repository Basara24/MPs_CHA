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
exports.TerrenosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const node_path_1 = require("node:path");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const create_terreno_dto_1 = require("./dto/create-terreno.dto");
const filter_terreno_dto_1 = require("./dto/filter-terreno.dto");
const update_terreno_dto_1 = require("./dto/update-terreno.dto");
const terrenos_service_1 = require("./terrenos.service");
const storage = (0, multer_1.diskStorage)({
    destination: 'uploads',
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}${(0, node_path_1.extname)(file.originalname)}`);
    },
});
let TerrenosController = class TerrenosController {
    terrenosService;
    constructor(terrenosService) {
        this.terrenosService = terrenosService;
    }
    create(dto, user) {
        return this.terrenosService.create(dto, user.sub);
    }
    findAll(filters) {
        return this.terrenosService.findAll(filters);
    }
    findOne(id) {
        return this.terrenosService.findOne(id);
    }
    update(id, dto) {
        return this.terrenosService.update(id, dto);
    }
    remove(id) {
        return this.terrenosService.remove(id);
    }
    uploadImages(id, files) {
        return this.terrenosService.addImages(id, files.images ?? []);
    }
};
exports.TerrenosController = TerrenosController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.UserType.ADMIN, client_1.UserType.VENDEDOR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_terreno_dto_1.CreateTerrenoDto, Object]),
    __metadata("design:returntype", void 0)
], TerrenosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_terreno_dto_1.FilterTerrenoDto]),
    __metadata("design:returntype", void 0)
], TerrenosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TerrenosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserType.ADMIN, client_1.UserType.VENDEDOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_terreno_dto_1.UpdateTerrenoDto]),
    __metadata("design:returntype", void 0)
], TerrenosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserType.ADMIN, client_1.UserType.VENDEDOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TerrenosController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/imagens'),
    (0, roles_decorator_1.Roles)(client_1.UserType.ADMIN, client_1.UserType.VENDEDOR),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'images', maxCount: 10 }], {
        storage,
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TerrenosController.prototype, "uploadImages", null);
exports.TerrenosController = TerrenosController = __decorate([
    (0, common_1.Controller)('terrenos'),
    __metadata("design:paramtypes", [terrenos_service_1.TerrenosService])
], TerrenosController);
//# sourceMappingURL=terrenos.controller.js.map