import { IsOptional, IsString, MinLength } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';

export class CompanyPaginationDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  search?: string;
}
