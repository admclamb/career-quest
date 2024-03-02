import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/data-model/entities';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  createBoard(createBoardDto: CreateBoardDto, userSub: string): Promise<Board> {
    const board = new Board();
    board.title = createBoardDto.title;
    board.userSub = userSub;

    return this.boardRepository.save(board);
  }
}
