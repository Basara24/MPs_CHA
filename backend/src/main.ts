import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const prisma = app.get(PrismaService);

  const uploadDir = config.get<string>('UPLOAD_DIR') ?? 'uploads';
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useStaticAssets(join(process.cwd(), uploadDir), { prefix: '/uploads' });

  const documentConfig = new DocumentBuilder()
    .setTitle('Sistema de Terrenos API')
    .setDescription('API para vendas e gestão de terrenos/chácaras')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);
  await prisma.$connect();
  await app.listen(config.get<number>('PORT') ?? 3000);
}
bootstrap();
