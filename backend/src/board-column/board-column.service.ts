import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardColumn } from 'src/data-model/entities';
import { Repository } from 'typeorm';

@Injectable()
export class BoardColumnService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly boardRepository: Repository<BoardColumn>,
  ) {}

  findOneById(
    boardColumnId: number,
    relations: string[] = [],
  ): Promise<BoardColumn> {
    if (!boardColumnId) {
      return null;
    }

    return this.boardRepository.findOne({
      where: { id: boardColumnId },
      relations,
    });
  }

  deleteById(id: number) {
    return this.boardRepository.delete(id);
  }
}
