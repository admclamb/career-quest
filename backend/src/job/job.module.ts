import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumn, Company, Job } from 'src/data-model/entities';
import { CompanyService } from 'src/company/company.service';
import { BoardColumnService } from 'src/board-column/board-column.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job, BoardColumn, Company])],
  controllers: [JobController],
  providers: [JobService, CompanyService, BoardColumnService],
})
export class JobModule {}
