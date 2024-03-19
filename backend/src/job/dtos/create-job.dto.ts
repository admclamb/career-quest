import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateJobDto {
  @IsNumber()
  columnId: number;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsBoolean()
  appliedOnCompanySite: boolean;

  @IsBoolean()
  hasCoverLetter: boolean;
}
