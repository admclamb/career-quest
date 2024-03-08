import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { CreateJobDto } from './dtos/create-job.dto';
import { Request } from 'express';
import { Job } from 'src/data-model/entities';
import { CompanyService } from 'src/company/company.service';
import { BoardColumnService } from 'src/board-column/board-column.service';

@Controller('/v1/job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly companyService: CompanyService,
    private readonly boardColumnService: BoardColumnService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Get('find')
  async findJob(@Query() { jobId }, @Req() request: Request): Promise<Job> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        'A user sub is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundJob = await this.jobService.findOneById(jobId);

    if (!foundJob) {
      throw new HttpException('Job not found.', HttpStatus.NOT_FOUND);
    }

    if (foundJob.userSub !== userSub) {
      throw new HttpException('You do not own this job.', HttpStatus.CONFLICT);
    }

    return foundJob;
  }

  @UseGuards(AuthorizationGuard)
  @Post()
  async createJob(
    @Body() createJobDto: CreateJobDto,
    @Req() request: Request,
  ): Promise<Job> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        'A user sub is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundCompany = await this.companyService.findOrCreate(
      createJobDto.companyName,
    );

    const foundBoardColumn = await this.boardColumnService.findOneById(
      createJobDto.columnId,
    );

    if (foundBoardColumn.userSub) {
      if (userSub !== foundBoardColumn.userSub) {
        throw new HttpException(
          'You do not own this column',
          HttpStatus.CONFLICT,
        );
      }
    }

    console.log(foundCompany, foundBoardColumn);

    return this.jobService.createJob(
      createJobDto.jobTitle,
      userSub,
      foundCompany,
      foundBoardColumn,
    );
  }
}
