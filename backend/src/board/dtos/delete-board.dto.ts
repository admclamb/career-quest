import { IsNumber } from 'class-validator';

export class DeleteBoardDto {
  @IsNumber()
  boardId: number;
}
