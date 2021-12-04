const { v4: uuidv4 } = require('uuid');
const { tasks } = require('../db/db');

const getTasks = (req, reply) => {
  const {boardId} = req.params;
  const currentTasks = tasks.tasks.filter(it => it.boardId === boardId);
  console.log('HEREHERE',tasks.tasks);
  reply.send(currentTasks);
};

const addTask = (req, reply) => {
  const { title, order, description, userId } = req.body;
  const {boardId} = req.params;

  const task = {
    id: uuidv4(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId: null, // Tests needs this should be null
  }

  tasks.tasks = [...tasks.tasks, task];

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(task);
};

module.exports = {
  getTasks,
  addTask,
}
