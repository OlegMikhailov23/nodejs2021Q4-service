import { Column } from '../../interfaces';
import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  columns: Array<Column>;
}
