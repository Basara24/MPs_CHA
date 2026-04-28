import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { RegistrarPagamentoDto } from './dto/registrar-pagamento.dto';
import { PagamentosService } from './pagamentos.service';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Get('contrato/:contratoId')
  listByContrato(@Param('contratoId', ParseIntPipe) contratoId: number) {
    return this.pagamentosService.listByContrato(contratoId);
  }

  @Patch(':id/pagar')
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  registrarPagamento(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RegistrarPagamentoDto,
  ) {
    return this.pagamentosService.registrarPagamento(id, dto);
  }

  @Get('inadimplencia/resumo')
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  getInadimplencia() {
    return this.pagamentosService.getInadimplencia();
  }
}
