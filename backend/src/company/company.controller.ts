import { Controller, Get, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyPaginationDto } from './dtos/company-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Company } from 'src/data-model/entities';

@Controller('v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findCompanies(
    @Query() companyPaginationDto: CompanyPaginationDto,
  ): Promise<PaginationResponse<Company>> {
    return this.companyService.findAllPageable(companyPaginationDto);
  }
}
