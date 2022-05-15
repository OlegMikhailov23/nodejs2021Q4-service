import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  order: number;

  userId: string | null;

  boardId: string;

  columnId: string | null;

  @IsNotEmpty()
  description: string;
}
