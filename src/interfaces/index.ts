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
  columns: Array<Column>
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

