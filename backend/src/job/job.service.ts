import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardColumn, Company, Job } from 'src/data-model/entities';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async createJob(
    jobTitle: string,
    userSub: string,
    company: Company,
    boardColumn: BoardColumn,
  ): Promise<Job> {
    const job = this.jobRepository.create({
      jobTitle,
      userSub,
      company,
      column: Promise.resolve(boardColumn),
    });

    return this.jobRepository.save(job);
  }
}
