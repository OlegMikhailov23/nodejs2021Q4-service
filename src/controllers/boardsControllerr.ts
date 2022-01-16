import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BoardReq } from '../interfaces/interfaces';
import { loggerMessages, myLogger } from '../logger';
import { Board } from '../entities/Board';

/**
 * Returns all boards from data base with status code 200.
 *
 * @param req - (FastifyRequest) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const getBoards = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const boardRepository = getRepository(Board);
  const boards = await boardRepository.find({ select: ['id', 'title', 'columns'] });
  const readableBoards = boards.map((it) => (
    {
      id: it.id,
      title: it.title,
      columns: JSON.parse(it.columns)
    }
  ));
  reply
    .code(200)
    .send(readableBoards);

  myLogger.info(loggerMessages.getAll(req.method ,req.url, 200))
};

/**
 * Creates board with status code 201.
 *
 * @param req - (BoardReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const addBoard = async (req: BoardReq, reply: FastifyReply): Promise<void> => {
  const { title, columns } = req.body;

  const boardRepository = getRepository(Board);
  const board = await boardRepository.create();
  const boardId = uuidv4();

  const columnsWithId = columns.map(column => (
    {
      id: uuidv4(),
      title: column.title,
      order: column.order,
    }
  ));

  board.id = boardId;
  board.title = title;
  board.columns = JSON.stringify(columnsWithId);
  await boardRepository.save(board);

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(board);

  myLogger.info(loggerMessages.addItem(req.method ,req.url,201, req.body))
};

/**
 * Returns single board from data base by board id with status code 200.
 *
 * @param req - (BoardReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const getBoard = async (req: BoardReq, reply: FastifyReply): Promise<void> => {
  const { id } = req.params;
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id);

  if (board) {
    board.columns = JSON.parse(board.columns);
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(board);
  }

    reply
      .code(404)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ message: `Board ${id} does not exist` });

  myLogger.info(loggerMessages.getSingle(req.method ,req.url, req.params.id, 200))
};

/**
 * Updates board by board id with status code 200.
 *
 * @param req - (BoardReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const updateBoard = async (req: BoardReq, reply: FastifyReply): Promise<void> => {
  const { id } = req.params;

  const { title, columns } = req.body;

  const boardRepository = getRepository(Board);


  const board = await boardRepository.findOne(id);

  if (board) {
    const updatedBoard = boardRepository.merge(board, { title: title }, {columns: JSON.stringify(columns)});
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(updatedBoard);
  }

  reply
    .code(404)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ message: `Board ${id} does not exist` });

  myLogger.info(loggerMessages.updateItem(req.method ,req.url,req.params.id, 200, req.body));
};

/**
 * Removes board by board id with status code 200.
 *
 * @param req - (BoardReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const deleteBoard = async (req: BoardReq, reply: FastifyReply): Promise<void> => {
  const { id } = req.params;

  const boardRepository = getRepository(Board);

  await boardRepository.delete(id);

  reply.send({ message: `Board ${id} has been deleted` });

  myLogger.info(loggerMessages.deleteItem(req.method ,req.url,req.params.id, 200))
};
