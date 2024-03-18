import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board, BoardColumn, Icon } from 'src/data-model/entities';
import { DataSource, Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/create-board.dto';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly dataSource: DataSource,
  ) {}

  async createBoard(
    createBoardDto: CreateBoardDto,
    userSub: string,
  ): Promise<Board> {
    const board = new Board();
    board.title = createBoardDto.title;
    board.userSub = userSub;
    board.columns = await this.initDefaultColumns(userSub);

    return this.boardRepository.save(board);
  }

  findOneById(boardId: number, relations: string[] = []): Promise<Board> {
    if (!boardId) {
      return null;
    }

    return this.boardRepository.findOne({
      where: { id: boardId },
      relations,
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

  async updateColumnOrder(
    board: Board,
    columnId: number,
    newIndex: number,
  ): Promise<Board> {
    board.columns.sort((a, b) => a.order - b.order);

    const columnToMoveIndex = board.columns.findIndex(
      (column) => column.id === columnId,
    );
    if (columnToMoveIndex === -1) {
      throw new Error('Column not found in board');
    }

    const [columnToMove] = board.columns.splice(columnToMoveIndex, 1);

    board.columns.splice(newIndex, 0, columnToMove);

    board.columns.forEach((column, index) => {
      column.order = index;
    });

    return this.boardRepository.save(board);
  }

  deleteById(boardId: number) {
    return this.boardRepository.delete(boardId);
  }

  private async initDefaultColumns(userSub: string): Promise<BoardColumn[]> {
    const icons = await this.dataSource.getRepository(Icon).find();

    const whishlistColumn = new BoardColumn();
    whishlistColumn.label = 'Wishlist';
    whishlistColumn.order = 0;
    whishlistColumn.userSub = userSub;
    whishlistColumn.icon = icons[0];

    const appliedColumn = new BoardColumn();
    appliedColumn.label = 'Applied';
    appliedColumn.order = 1;
    appliedColumn.userSub = userSub;
    appliedColumn.icon = icons[1];

    const interviewColumn = new BoardColumn();
    interviewColumn.label = 'Interview';
    interviewColumn.order = 2;
    interviewColumn.userSub = userSub;
    interviewColumn.icon = icons[2];

    const offerColumn = new BoardColumn();
    offerColumn.label = 'Offer';
    offerColumn.order = 3;
    offerColumn.userSub = userSub;
    offerColumn.icon = icons[3];

    const rejectedColumn = new BoardColumn();
    rejectedColumn.label = 'Rejected';
    rejectedColumn.order = 4;
    rejectedColumn.userSub = userSub;
    rejectedColumn.icon = icons[4];

    return [
      whishlistColumn,
      appliedColumn,
      interviewColumn,
      offerColumn,
      rejectedColumn,
    ];
  }
}
