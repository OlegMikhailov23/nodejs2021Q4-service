import { PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';
import { Column } from '../../interfaces';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  id: string;
  title: string;
  columns: Array<Column>;
}
