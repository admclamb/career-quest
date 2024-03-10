import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardColumnService } from './board-column.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { DeleteColumnDto } from './dtos/delete-column.dto';
import { Request } from 'express';
import { CreateColumnDto } from './dtos/create-column.dto';
import { BoardColumn } from 'src/data-model/entities';
import { BoardService } from 'src/board/board.service';

@Controller('/v1/column')
export class BoardColumnController {
  constructor(
    private readonly boardColumnService: BoardColumnService,
    private readonly boardService: BoardService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Put('create-column')
  async createColumn(
    @Query() createColumnDto: CreateColumnDto,
    @Req() request: Request,
  ): Promise<BoardColumn> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        'A user sub is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundBoard = await this.boardService.findOneById(
      createColumnDto.boardId,
      ['columns'],
    );

    if (!foundBoard) {
      throw new HttpException('Board not found.', HttpStatus.NOT_FOUND);
    }

    if (foundBoard.userSub !== userSub) {
      throw new HttpException(
        'You do not own this board.',
        HttpStatus.CONFLICT,
      );
    }

    const order = foundBoard.columns.length;

    return this.boardColumnService.create(
      foundBoard,
      userSub,
      createColumnDto.label,
      order,
    );
  }

  @UseGuards(AuthorizationGuard)
  @Delete('delete')
  async deleteColumn(
    @Query() deleteColumnDto: DeleteColumnDto,
    @Req() request: Request,
  ): Promise<{ message: string }> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        'A user sub is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundColumn = await this.boardColumnService.findOneById(
      deleteColumnDto.columnId,
      ['jobs', 'board'],
    );

    if (foundColumn.userSub !== userSub) {
      throw new HttpException(
        'You do not own this column.',
        HttpStatus.CONFLICT,
      );
    }

    if (foundColumn.jobs.length) {
      throw new HttpException(
        'No jobs are allowed to be on the column when deleting.',
        HttpStatus.CONFLICT,
      );
    }

    await this.boardColumnService.deleteById(deleteColumnDto.columnId);

    await this.boardColumnService.updateColumnOrders(foundColumn.board.id);

    return {
      message: `Column with the name: "${foundColumn.label}" has been successfully deleted.`,
    };
  }
}
