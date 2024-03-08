import { Module } from '@nestjs/common';
import { BoardColumnService } from './board-column.service';
import { BoardColumnController } from './board-column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board, BoardColumn, Job } from 'src/data-model/entities';
import { BoardService } from 'src/board/board.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn, Board, Job])],
  controllers: [BoardColumnController],
  providers: [BoardColumnService, BoardService],
})
export class BoardColumnModule {}
