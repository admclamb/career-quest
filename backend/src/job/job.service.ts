import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardColumn, Company, Job } from 'src/data-model/entities';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dtos/create-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  createJob(
    createJobDto: CreateJobDto,
    userSub: string,
    company: Company,
    boardColumn: BoardColumn,
  ): Promise<Job> {
    const job = this.jobRepository.create({
      ...createJobDto,
      userSub,
      company,
      column: boardColumn,
    });

    return this.jobRepository.save(job);
  }

  updateJob(job: Job): Promise<Job> {
    return this.jobRepository.save(job);
  }

  deleteJob(jobId: number) {
    return this.jobRepository.delete(jobId);
  }

  findOneById(id: number, relations: string[] = []): Promise<Job> {
    if (!id) {
      return null;
    }

    return this.jobRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }
}
