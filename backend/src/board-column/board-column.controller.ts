import { Controller } from '@nestjs/common';
import { BoardColumnService } from './board-column.service';

@Controller('/v1/column')
export class BoardColumnController {
  constructor(private readonly boardColumnService: BoardColumnService) {}
}
