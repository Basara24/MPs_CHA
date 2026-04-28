import { Controller, Get, Header } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('vendas.csv')
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  @Header('Content-Type', 'text/csv')
  async vendasCsv() {
    return this.reportsService.vendasCsv();
  }

  @Get('inadimplencia.csv')
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  @Header('Content-Type', 'text/csv')
  async inadimplenciaCsv() {
    return this.reportsService.inadimplenciaCsv();
  }
}
