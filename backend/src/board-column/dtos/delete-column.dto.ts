import { IsNumber } from 'class-validator';

export class DeleteColumnDto {
  @IsNumber()
  columnId: number;
}
