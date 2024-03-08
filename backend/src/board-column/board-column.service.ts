import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board, BoardColumn } from 'src/data-model/entities';
import { Repository } from 'typeorm';

@Injectable()
export class BoardColumnService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly boardColumnRepository: Repository<BoardColumn>,
  ) {}

  findOneById(
    boardColumnId: number,
    relations: string[] = [],
  ): Promise<BoardColumn> {
    if (!boardColumnId) {
      return null;
    }

    return this.boardColumnRepository.findOne({
      where: { id: boardColumnId },
      relations,
    });
  }

  create(
    board: Board,
    userSub: string,
    label: string,
    order: number,
  ): Promise<BoardColumn> {
    const column = this.boardColumnRepository.create({
      board,
      userSub,
      label,
      order,
    });

    console.log(column);

    return this.boardColumnRepository.save(column);
  }

  deleteById(id: number) {
    return this.boardColumnRepository.delete(id);
  }
}
