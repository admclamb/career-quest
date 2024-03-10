import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { CreateBoardDto } from './dtos/create-board.dto';
import { Request } from 'express';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Board } from 'src/data-model/entities';

@Controller('/v1/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthorizationGuard)
  @Get()
  async findBoards(
    @Query() paginationDto: PaginationDto,
    @Req() request: Request,
  ): Promise<PaginationResponse<Board>> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        'A user sub is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await this.boardService.findAllPageable(
      paginationDto,
      userSub,
    );

    response.results.forEach((result) => result.removePrivateProperties());

    return response;
  }

  @UseGuards(AuthorizationGuard)
  @Get('find')
  async findBoard(
    @Query() { boardId },
    @Req() request: Request,
  ): Promise<Board> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        'A user sub is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await this.boardService.findOneById(boardId, [
      'columns',
      'columns.jobs',
      'columns.jobs.company',
    ]);

    if (!response || response.userSub !== userSub) {
      throw new HttpException('Board not found.', HttpStatus.NOT_FOUND);
    }

    response.removePrivateProperties();
    response.sortColumns();
    return response;
  }

  @UseGuards(AuthorizationGuard)
  @Post()
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Req() request: Request,
  ) {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        'A user sub is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdBoard = await this.boardService.createBoard(
      createBoardDto,
      userSub,
    );

    createdBoard.removePrivateProperties();
    return createdBoard;
  }
}
