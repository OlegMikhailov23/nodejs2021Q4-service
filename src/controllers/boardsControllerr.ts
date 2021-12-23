import { v4 as uuidv4 } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { boards, tasks } from '../db/db';
import { BoardReq } from '../interfaces/interfaces';

/**
 * Returns all boards from data base with status code 200.
 *
 * @param req - (FastifyRequest) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const getBoards = (req: FastifyRequest, reply: FastifyReply): void => {
  reply.send(boards.boards);
};

/**
 * Creates board with status code 201.
 *
 * @param req - (BoardReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const addBoard = (req: BoardReq, reply: FastifyReply): void => {
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

  boards.boards = [...boards.boards, board];

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(board);
};

/**
 * Returns single board from data base by board id with status code 200.
 *
 * @param req - (BoardReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const getBoard = (req: BoardReq, reply: FastifyReply): void => {
  const { id } = req.params;
  const board = boards.boards.find(it => it.id === id);

  if (!board) {
    reply
      .code(404)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ message: `Board ${id} does not exist` });
  }

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(board);
};

/**
 * Updates board by board id with status code 200.
 *
 * @param req - (BoardReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const updateBoard = (req: BoardReq, reply: FastifyReply): void => {
  const { id } = req.params;

  const { title, columns } = req.body;

  boards.boards = boards.boards.map(board => (board.id === id ? { id, title, columns } : board));

  const updatedBoard = boards.boards.find(board => board.id === id);

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(updatedBoard);
};

/**
 * Removes board by board id with status code 200.
 *
 * @param req - (BoardReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const deleteBoard = (req: BoardReq, reply: FastifyReply): void => {
  const { id } = req.params;
  boards.boards = boards.boards?.filter(it => it.id !== id);

  tasks.tasks = tasks.tasks?.filter(it => it.boardId !== id);

  reply.send({ message: `Board ${id} has been deleted` });
};
