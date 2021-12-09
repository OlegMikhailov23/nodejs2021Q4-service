
import { v4 as uuidv4 } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import {boards, tasks} from '../db/db';
import { BoardReq } from '../interfaces/interfaces';

export const getBoards = (req: FastifyRequest, reply: FastifyReply) => {
  reply.send(boards.boards);
};

export const addBoard = (req: BoardReq, reply: FastifyReply) => {
  const { title, columns } = req.body;

  const columnsWithId = columns.map(column => (
      {
        id: uuidv4(),
        title: column.title,
        order: column.order,
      }
    ))

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

export const getBoard = (req: BoardReq, reply: FastifyReply) => {
  const {id} = req.params;
  const board = boards.boards.find(it => it.id === id);

  if (!board) {
    reply
      .code(404)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({message : `Board ${id} does not exist`} );
  }

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(board);
}

export const updateBoard = (req: BoardReq, reply: FastifyReply) => {
  const {id} = req.params;

  const { title, columns } = req.body;

  boards.boards = boards.boards.map(board => (board.id === id ? {id, title, columns} : board));

  const updatedBoard = boards.boards.find(board => board.id === id);

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(updatedBoard);
}

export const deleteBoard = (req: BoardReq, reply: FastifyReply) => {
  const {id} = req.params;
  boards.boards = boards.boards?.filter(it => it.id !== id)

  tasks.tasks = tasks.tasks?.filter(it => it.boardId !== id)

  reply.send({message: `Board ${id} has been deleted`})
}
