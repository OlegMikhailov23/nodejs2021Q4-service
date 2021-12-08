const { v4: uuidv4 } = require('uuid');
const { boards, tasks } = require('../db/db');

const getBoards = (req, reply) => {
  reply.send(boards.boards);
};

const addBoard = (req, reply) => {
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

const getBoard = (req, reply) => {
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

const updateBoard = (req, reply) => {
  const {id} = req.params;

  const { title, columns } = req.body;

  boards.boards = boards.boards.map(board => (board.id === id ? {id, title, columns} : board));

  const updatedBoard = boards.boards.find(board => board.id === id);

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(updatedBoard);
}

const deleteBoard = (req, reply) => {
  const {id} = req.params;
  boards.boards = boards.boards.filter(it => it.id !== id)

  tasks.tasks = tasks.tasks.filter(it => it.boardId !== id)

  reply.send({message: `Board ${id} has been deleted`})
}

module.exports = {
  getBoards,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard
}
