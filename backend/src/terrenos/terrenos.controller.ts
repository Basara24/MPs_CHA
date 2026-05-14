import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
import { UserType } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateTerrenoDto } from './dto/create-terreno.dto';
import { FilterTerrenoDto } from './dto/filter-terreno.dto';
import { UpdateTerrenoDto } from './dto/update-terreno.dto';
import { TerrenosService } from './terrenos.service';

const storage = diskStorage({
  destination: 'uploads',
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
  },
});

@Controller('terrenos')
export class TerrenosController {
  constructor(private readonly terrenosService: TerrenosService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], {
      storage,
    }),
  )
  create(
    @Body() dto: CreateTerrenoDto,
    @CurrentUser() user: { sub: number },
    @UploadedFiles()
    files: { images?: Express.Multer.File[] },
  ) {
    return this.terrenosService.create(dto, user.sub, files.images ?? []);
  }

  @Get()
  findAll(@Query() filters: FilterTerrenoDto) {
    return this.terrenosService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.terrenosService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTerrenoDto) {
    return this.terrenosService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.terrenosService.remove(id);
  }

  @Post(':id/imagens')
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], {
      storage,
    }),
  )
  uploadImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles()
    files: { images?: Express.Multer.File[] },
  ) {
    return this.terrenosService.addImages(id, files.images ?? []);
  }
}
