import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { v4 as uuidv4 } from 'uuid';
import { Board } from "../interfaces";
import { tasks } from "../fake-db";

@Injectable()
export class BoardsService {
  boardsStorage: Board[] = [];

  create(createBoardDto: CreateBoardDto, req) {
    const { title, columns } = req.body;

    const columnsWithId = columns.map(column => (
      {
        id: uuidv4(),
        title: column.title,
        order: column.order
      }
    ));

    const board = {
      id: uuidv4(),
      title,
      columns: columnsWithId
    };

    this.boardsStorage = [...this.boardsStorage, board];

    return board;
  }

  findAll() {
    return this.boardsStorage;
  }

  findOne(id: string, res) {
    const board = this.boardsStorage.find(it => it.id === id);

    if (!board) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Board ${id} does not exist` });
    }

    res
      .status(HttpStatus.OK)
      .send(board);
  }

  update(id: string, updateBoardDto: UpdateBoardDto, req) {
    const { title, columns } = req.body;
    this.boardsStorage = this.boardsStorage.map(board => (board.id === id ? { id, title, columns } : board));
    const updatedBoard = this.boardsStorage.find(board => board.id === id);

    return updatedBoard;
  }

  remove(id: string) {
    this.boardsStorage = this.boardsStorage.filter(it => it.id !== id);
    tasks.tasks = tasks.tasks?.filter(it => it.boardId !== id);

    return `This action removes a #${id} board`;
  }
}
