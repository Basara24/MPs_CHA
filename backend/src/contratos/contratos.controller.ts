import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { ContratosService } from './contratos.service';

@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  create(
    @Body() dto: CreateContratoDto,
    @CurrentUser() user: { sub: number },
  ) {
    return this.contratosService.create(dto, user.sub);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  findAll() {
    return this.contratosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contratosService.findOne(id);
  }

  @Patch(':id/cancelar')
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.contratosService.cancel(id);
  }
}
