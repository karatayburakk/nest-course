import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Report } from './report.entity';
import { CreateReportDto, ReportDto } from './dtos';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  @Post()
  create(
    @Body() body: CreateReportDto,
    @CurrentUser() user: User,
  ): Promise<Report> {
    return this.reportsService.create(body, user);
  }
}
