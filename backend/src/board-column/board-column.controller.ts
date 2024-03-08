import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardColumnService } from './board-column.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { DeleteColumnDto } from './dtos/delete-column.dto';
import { Request } from 'express';

@Controller('/v1/column')
export class BoardColumnController {
  constructor(private readonly boardColumnService: BoardColumnService) {}

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
      ['jobs'],
    );

    if (foundColumn.userSub !== userSub) {
      throw new HttpException('You do not own this job.', HttpStatus.CONFLICT);
    }

    if (foundColumn.jobs.length) {
      throw new HttpException(
        'No jobs are allowed to be on the column when deleting.',
        HttpStatus.CONFLICT,
      );
    }

    const response = await this.boardColumnService.deleteById(
      deleteColumnDto.columnId,
    );

    console.log(response);

    return {
      message: `Column with the name: "${foundColumn.label}" has been successfully deleted`,
    };
  }
}
