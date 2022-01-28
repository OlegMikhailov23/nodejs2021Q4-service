import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  id: string;

  title: string;

  order: number;

  userId: string | null;

  boardId: string;

  columnId: string | null;

  description: string;
}
