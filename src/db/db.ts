import { BoardCollection, TaskCollection, UserCollection } from '../interfaces/interfaces';

/**
 * This creates in memory data bse.
 */

export const users: UserCollection = {
  id: 'users',
  users: []
};
export const boards: BoardCollection = {
  id: 'boards',
  boards: []
};
export const tasks: TaskCollection = {
  id: 'tasks',
  tasks: []
};
