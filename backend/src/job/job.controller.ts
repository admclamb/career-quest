import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
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
import { UpdateJobDto } from './dtos/update-job.dto';

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

    const foundJob = await this.jobService.findOneById(jobId, ['company']);

    if (!foundJob) {
      throw new HttpException('Job not found.', HttpStatus.NOT_FOUND);
    }

    if (foundJob.userSub !== userSub) {
      throw new HttpException('You do not own this job.', HttpStatus.CONFLICT);
    }

    return foundJob;
  }

  @UseGuards(AuthorizationGuard)
  @Put('update')
  async updateJob(
    @Body() updateJobDto: UpdateJobDto,
    @Req() request: Request,
  ): Promise<Job> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        'A user sub is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundJob = await this.jobService.findOneById(updateJobDto.job.id);

    if (!foundJob) {
      throw new HttpException('Can not find job.', HttpStatus.NOT_FOUND);
    }

    if (foundJob.userSub !== userSub) {
      throw new HttpException('You do not own this job', HttpStatus.CONFLICT);
    }

    return this.jobService.updateJob(updateJobDto.job);
  }

  @UseGuards(AuthorizationGuard)
  @Delete('delete')
  async deleteJob(
    @Query() { jobId },
    @Req() request: Request,
  ): Promise<{ message: string }> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        'A user sub is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundJob = await this.jobService.findOneById(jobId);

    if (!foundJob) {
      throw new HttpException('Can not find job.', HttpStatus.NOT_FOUND);
    }

    if (foundJob.userSub !== userSub) {
      throw new HttpException('You do not own this job', HttpStatus.CONFLICT);
    }

    await this.jobService.deleteJob(jobId);

    return {
      message: `Job with the job title: "${foundJob.jobTitle}" has been successfully deleted.`,
    };
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

    return this.jobService.createJob(
      createJobDto,
      userSub,
      foundCompany,
      foundBoardColumn,
    );
  }
}
