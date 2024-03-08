import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
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

    const job = new Job();

    job.column = Promise.resolve(foundBoardColumn);
    job.company = foundCompany;
    job.jobTitle = createJobDto.jobTitle;
    job.userSub = userSub;

    return this.jobService.createJob(
      createJobDto.jobTitle,
      userSub,
      foundCompany,
      foundBoardColumn,
    );
  }
}
