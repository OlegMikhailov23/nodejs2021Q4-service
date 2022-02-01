import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { v4 as uuidv4 } from 'uuid';

import { tasks } from '../fake-db';
import { Request, Response } from 'express';
import { Board } from "../entities/Board";
import { getRepository } from "typeorm";
import { BoardReq } from "../interfaces";
import ColumnEntity from "../entities/Column";

const BOARD_RELATIONS = { relations: ['columns'] };

@Injectable()
export class BoardsService {
  async create(createBoardDto: CreateBoardDto, req: BoardReq): Promise<Board> {
    const { title, columns } = req.body;

    const boardRepository = getRepository(Board);
    const board = await boardRepository.create();
    const boardId = uuidv4();

    const columnsWithId = columns.map((column: { title: any; order: any; }) => (
      {
        id: uuidv4(),
        title: column.title,
        order: column.order
      }
    ));

    board.id = boardId;
    board.title = title;
    board.columns = columnsWithId;
    await boardRepository.save(board);

    return board;
  }

  async findAll(): Promise<Board[]> {
    const boardRepository = getRepository(Board);
    const boards = await boardRepository.find(BOARD_RELATIONS);
    return boards;
  }

  async findOne(id: string, res: Response): Promise<void> {
    const boardRepository = getRepository(Board);
    const board = await boardRepository.findOne(id, BOARD_RELATIONS);

    if (!board) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Board ${id} does not exist` });
    }

    res.status(HttpStatus.OK).send(board);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const boardRepository = getRepository(Board);
    const board = await boardRepository.findOne(id);
    const updatedBoard = await boardRepository.merge(board, updateBoardDto);
    await boardRepository.save(updatedBoard);

    return updatedBoard;
  }

  async remove(id: string): Promise<string> {
    const boardRepository = getRepository(Board);
    // const taskRepository = getRepository(Task);
    // await taskRepository.delete({ boardId: id });
    await boardRepository.delete(id);

    return `This action removes a #${id} board`;
  }
}
