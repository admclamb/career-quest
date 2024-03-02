import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/data-model/entities';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/create-board.dto';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';

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

  findAllPageable(
    paginationDto: PaginationDto,
    userSub: string,
  ): Promise<PaginationResponse<Board>> {
    const entityName = 'Board';
    const queryBuilder = this.boardRepository.createQueryBuilder(entityName);

    queryBuilder.where(`${entityName}.userSub = :userSub`, {
      userSub,
    });

    return Pagination.paginate<Board>(queryBuilder, paginationDto, entityName);
  }
}
