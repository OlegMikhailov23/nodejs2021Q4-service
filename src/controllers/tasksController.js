const { v4: uuidv4 } = require('uuid');
const { tasks } = require('../db/db');

const getTasks = (req, reply) => {
  const { boardId } = req.params;
  const currentTasks = tasks.tasks.filter(it => it.boardId === boardId);
  reply.send(currentTasks);
};

const addTask = (req, reply) => {
  const { title, order, description, userId } = req.body;
  const { boardId } = req.params;

  const task = {
    id: uuidv4(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId: null // Tests needs this should be null
  };

  tasks.tasks = [...tasks.tasks, task];

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(task);
};

const getTask = (req, reply) => {
  const { taskId } = req.params;

  const task = tasks.tasks.find(it => it.id === taskId);


  if (!task) {
    reply
      .code(404)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ message: `Task ${taskId} does not exist` });
  }

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(task);
};

const updateTask = (req, reply) => {
  const { taskId } = req.params;

  const { title, order, description, userId, boardId, columnId } = req.body;

  tasks.tasks = tasks.tasks.map(task => (task.id === taskId ? {
    id: taskId,
    title,
    order,
    description,
    userId,
    boardId,
    columnId} : task))

  const updatedTask = tasks.tasks.find(task => task.id === taskId)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(updatedTask);
};

const deleteTask = (req, reply) => {
  const {taskId} = req.params;
  tasks.tasks = tasks.tasks.filter(it => it.id !== taskId);
  reply.send({message: `Task ${taskId} has been deleted`});
}

module.exports = {
  getTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
};
