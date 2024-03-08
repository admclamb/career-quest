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

  createJob(
    jobTitle: string,
    userSub: string,
    company: Company,
    boardColumn: BoardColumn,
  ): Promise<Job> {
    const job = this.jobRepository.create({
      jobTitle,
      userSub,
      company,
      column: boardColumn,
    });

    return this.jobRepository.save(job);
  }

  findOneById(id: number, relations: string[]): Promise<Job> {
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
