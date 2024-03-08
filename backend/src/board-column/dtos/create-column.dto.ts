import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateColumnDto {
  @IsNumber()
  boardId: number;

  @IsString()
  @MaxLength(100)
  label: string;
}
