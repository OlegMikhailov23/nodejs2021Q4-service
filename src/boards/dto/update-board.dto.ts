import { PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';
import ColumnEntity from "../../entities/Column";

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  id: string;
  title: string;
  columns: Array<ColumnEntity>;
}
