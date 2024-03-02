import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board, BoardColumn } from 'src/data-model/entities';
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
    board.columns = this.initDefaultColumns();

    return this.boardRepository.save(board);
  }

  findOneById(boardId: number, relations: string[]): Promise<Board> {
    if (!boardId) {
      return null;
    }

    return this.boardRepository.findOne({
      where: { id: boardId },
      relations: relations,
    });
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

  private initDefaultColumns(): BoardColumn[] {
    const whishlistColumn = new BoardColumn();
    whishlistColumn.label = 'Wishlist';
    whishlistColumn.order = 0;

    const appliedColumn = new BoardColumn();
    appliedColumn.label = 'Applied';
    appliedColumn.order = 1;

    const interviewColumn = new BoardColumn();
    interviewColumn.label = 'Interview';
    interviewColumn.order = 2;

    const offerColumn = new BoardColumn();
    offerColumn.label = 'Offer';
    offerColumn.order = 3;

    const rejectedColumn = new BoardColumn();
    rejectedColumn.label = 'Rejected';
    offerColumn.order = 4;

    return [
      whishlistColumn,
      appliedColumn,
      interviewColumn,
      offerColumn,
      rejectedColumn,
    ];
  }
}
