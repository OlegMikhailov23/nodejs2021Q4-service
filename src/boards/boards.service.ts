import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { Board } from '../entities/Board';
import { getRepository } from 'typeorm';
import { BoardReq } from '../interfaces';
import { Task } from '../entities/Task';
import { loggerMessages, myLogger } from '../logger';

const BOARD_RELATIONS = { relations: ['columns'] };

@Injectable()
export class BoardsService {
  url = '/boards';

  async create(createBoardDto: CreateBoardDto, req: BoardReq): Promise<Board> {
    const { title, columns } = req.body;

    const boardRepository = getRepository(Board);
    const board = await boardRepository.create();
    const boardId = uuidv4();

    const columnsWithId = columns.map(
      (column: { title: string; order: number }) => ({
        id: uuidv4(),
        title: column.title,
        order: column.order,
      }),
    );

    board.id = boardId;
    board.title = title;
    board.columns = columnsWithId;
    await boardRepository.save(board);

    myLogger.info(
      loggerMessages.addItem(this.url, HttpStatus.CREATED, createBoardDto),
    );

    return board;
  }

  async findAll(): Promise<Board[]> {
    const boardRepository = getRepository(Board);
    const boards = await boardRepository.find(BOARD_RELATIONS);
    myLogger.info(loggerMessages.getAll(this.url, HttpStatus.OK));

    return boards;
  }

  async findOne(id: string, res: Response): Promise<void> {
    const boardRepository = getRepository(Board);
    const board = await boardRepository.findOne(id, BOARD_RELATIONS);

    if (!board) {
      myLogger.warn(
        loggerMessages.getSingle(this.url, id, HttpStatus.NOT_FOUND),
      );

      res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Board ${id} does not exist` });
    }
    myLogger.info(loggerMessages.getSingle(this.url, id, HttpStatus.OK));

    res.status(HttpStatus.OK).send(board);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const boardRepository = getRepository(Board);
    const board = await boardRepository.findOne(id);
    if (!board) {
      myLogger.info(
        loggerMessages.updateItem(
          this.url,
          id,
          HttpStatus.NOT_FOUND,
          updateBoardDto,
        ),
      );
      return null;
    }
    const updatedBoard = await boardRepository.merge(board, updateBoardDto);
    await boardRepository.save(updatedBoard);
    myLogger.info(
      loggerMessages.updateItem(this.url, id, HttpStatus.OK, updateBoardDto),
    );

    return updatedBoard;
  }

  async remove(id: string): Promise<string> {
    const boardRepository = getRepository(Board);
    const taskRepository = getRepository(Task);
    await taskRepository.delete({ boardId: id });
    await boardRepository.delete(id);
    myLogger.info(loggerMessages.deleteItem(this.url, id, HttpStatus.OK));

    return `This action removes a #${id} board`;
  }
}
