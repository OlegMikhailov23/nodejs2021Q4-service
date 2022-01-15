import { FastifyRequest } from 'fastify';

export interface User {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface UserCollection {
  id: string;
  users: Array<User> | [];
}

export interface Column {
  id: string;
  title: string;
  order: number;
}

export interface Board {
  id: string;
  title: string;
  columns: Array<Column>
}

export interface BoardCollection {
  id: string;
  boards: Array<Board> | [];
}

export interface Task {
  id: string;
  title: string;
  order: number | null;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
  description: string | null;
}

export interface TaskCollection {
  id: string;
  tasks: Array<Task>;
}

export interface userParams {
  id: string;
}

export type UserReq = FastifyRequest<{
  Body: User;
  Params: {
    id: string
  }
}>

export type BoardReq = FastifyRequest<{
  Body: Board;
  Params: {
    id: string
  }
}>

export type TaskReq = FastifyRequest<{
  Body: Task;
  Params: {
    boardId: string;
    taskId: string;
  }
}>
