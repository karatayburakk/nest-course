import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { ApproveReportDto, CreateReportDto, GetEstimateDto } from './dtos';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  async create(body: CreateReportDto, user: User): Promise<Report> {
    const report = this.repo.create(body);
    report.user = user;

    return this.repo.save(report);
  }

  async changeApproval(id: number, body: ApproveReportDto) {
    const { approved } = body;

    const report = await this.repo.findOne({ where: { id } });

    if (!report) throw new NotFoundException('Report not found.');

    report.approved = approved;

    return this.repo.save(report);
  }

  findAll(): Promise<Report[]> {
    return this.repo.find({});
  }

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
