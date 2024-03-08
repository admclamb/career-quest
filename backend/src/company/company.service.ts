import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/data-model/entities';
import { Repository } from 'typeorm';
import { CompanyPaginationDto } from './dtos/company-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyService: Repository<Company>,
  ) {}

  findAllPageable(
    companyPaginationDto: CompanyPaginationDto,
  ): Promise<PaginationResponse<Company>> {
    const entityName = 'company';
    const queryBuilder = this.companyService.createQueryBuilder(entityName);

    if (companyPaginationDto.search) {
      queryBuilder.where(`${entityName}.name ILIKE :search`, {
        search: `%${companyPaginationDto.search}%`,
      });
    }

    return Pagination.paginate<Company>(
      queryBuilder,
      companyPaginationDto,
      entityName,
    );
  }

  async findOrCreate(companyName: string): Promise<Company> {
    const foundCompany = await this.findOneByName(companyName);

    if (foundCompany) {
      return foundCompany;
    }

    const company = this.companyService.create({
      name: companyName,
    });

    return this.companyService.save(company);
  }

  findOneByName(companyName: string): Promise<Company> {
    if (!companyName) {
      return null;
    }

    return this.companyService.findOneBy({ name: companyName });
  }
}
