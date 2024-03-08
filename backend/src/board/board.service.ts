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
    board.columns = this.initDefaultColumns(userSub);

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

  private initDefaultColumns(userSub: string): BoardColumn[] {
    const whishlistColumn = new BoardColumn();
    whishlistColumn.label = 'Wishlist';
    whishlistColumn.order = 0;
    whishlistColumn.userSub = userSub;

    const appliedColumn = new BoardColumn();
    appliedColumn.label = 'Applied';
    appliedColumn.order = 1;
    appliedColumn.userSub = userSub;

    const interviewColumn = new BoardColumn();
    interviewColumn.label = 'Interview';
    interviewColumn.order = 2;
    interviewColumn.userSub = userSub;

    const offerColumn = new BoardColumn();
    offerColumn.label = 'Offer';
    offerColumn.order = 3;
    offerColumn.userSub = userSub;

    const rejectedColumn = new BoardColumn();
    rejectedColumn.label = 'Rejected';
    rejectedColumn.order = 4;
    rejectedColumn.userSub = userSub;

    return [
      whishlistColumn,
      appliedColumn,
      interviewColumn,
      offerColumn,
      rejectedColumn,
    ];
  }
}
