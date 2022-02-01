import { IsNotEmpty } from 'class-validator';
import ColumnEntity from "../../entities/Column";

export class CreateBoardDto {
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  columns: Array<ColumnEntity>;
}
