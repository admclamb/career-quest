import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';

export class JobPaginationDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  search: string;
}
