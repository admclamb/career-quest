import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { CreateBoardDto } from './dtos/create-board.dto';
import { Request } from 'express';

@Controller('/v1/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

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
