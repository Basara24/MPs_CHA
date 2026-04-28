"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./prisma/prisma.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const prisma = app.get(prisma_service_1.PrismaService);
    const uploadDir = config.get('UPLOAD_DIR') ?? 'uploads';
    if (!(0, node_fs_1.existsSync)(uploadDir)) {
        (0, node_fs_1.mkdirSync)(uploadDir, { recursive: true });
    }
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.useStaticAssets((0, node_path_1.join)(process.cwd(), uploadDir), { prefix: '/uploads' });
    const documentConfig = new swagger_1.DocumentBuilder()
        .setTitle('Sistema de Terrenos API')
        .setDescription('API para vendas e gestão de terrenos/chácaras')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, documentConfig);
    swagger_1.SwaggerModule.setup('docs', app, swaggerDocument);
    await prisma.$connect();
    await app.listen(config.get('PORT') ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map