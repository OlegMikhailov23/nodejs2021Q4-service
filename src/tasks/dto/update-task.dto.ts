import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  title: string;

  order: number;

  userId: string | null;

  boardId: string;

  columnId: string | null;

  description: string;
}
