import { Controller, Get } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('kpis')
  @Roles(UserType.ADMIN, UserType.VENDEDOR)
  getKpis() {
    return this.dashboardService.getKpis();
  }
}
