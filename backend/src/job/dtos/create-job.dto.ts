import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateJobDto {
  @IsNumber()
  columnId: number;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;
}
