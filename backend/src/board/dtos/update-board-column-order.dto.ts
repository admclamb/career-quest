import { IsNumber, Min } from 'class-validator';

export class UpdateBoardColumnOrderDto {
  @IsNumber()
  boardId: number;

  @IsNumber()
  columnId: number;

  @IsNumber()
  @Min(0, { message: 'Column index has to be greater than 0 ' })
  columnIndex: number;
}
