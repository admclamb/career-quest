import { Controller, Post, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';

@Controller('/v1/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  async createBoard() {
    return 'TESTING';
  }
}
