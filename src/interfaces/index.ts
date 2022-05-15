import { Request } from 'express';

export interface User {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface Column {
  id: string;
  title: string;
  order: number;
}

export interface Board {
  id: string;
  title: string;
  columns: Array<Column>;
}

export interface Task {
  id: string;
  title: string;
  order: number;
  userId: string | null;
  boardId: string;
  columnId: string | null;
  description: string;
}

export type BoardReq = Request<{
  Body: Board;
  Params: {
    id: string;
  };
}>;

export type TaskReq = Request<{
  Body: Task;
  Params: {
    boardId: string;
    taskId: string;
  };
}>;

export type UserReq = Request<{
  Body: User;
  Params: {
    id: string;
  };
}>;
