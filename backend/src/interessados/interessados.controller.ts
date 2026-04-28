import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateInteresseDto } from './dto/create-interesse.dto';
import { InteressadosService } from './interessados.service';

@Controller('interessados')
export class InteressadosController {
  constructor(private readonly interessadosService: InteressadosService) {}

  @Post('terreno/:terrenoId')
  @Roles(UserType.CLIENTE)
  create(
    @Param('terrenoId', ParseIntPipe) terrenoId: number,
    @CurrentUser() user: { sub: number },
    @Body() dto: CreateInteresseDto,
  ) {
    return this.interessadosService.create(terrenoId, user.sub, dto);
  }

  @Get('terreno/:terrenoId')
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  listByTerreno(@Param('terrenoId', ParseIntPipe) terrenoId: number) {
    return this.interessadosService.listByTerreno(terrenoId);
  }
}
