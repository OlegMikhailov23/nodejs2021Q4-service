import { Board, Task, User } from '../interfaces';

export interface UserCollection {
  id: string;
  users: Array<User> | [];
}

export interface BoardCollection {
  id: string;
  boards: Array<Board> | [];
}

export interface TaskCollection {
  id: string;
  tasks: Array<Task> | [];
}

/**
 * This creates in memory data bse.
 */

export const users: UserCollection = {
  id: 'users',
  users: [],
};
export const boards: BoardCollection = {
  id: 'boards',
  boards: [],
};
export const tasks: TaskCollection = {
  id: 'tasks',
  tasks: [],
};
