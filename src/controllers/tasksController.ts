import { v4 as uuidv4 } from 'uuid';
import { FastifyReply } from 'fastify';
import { tasks } from '../db/db';
import { TaskReq } from '../interfaces/interfaces';

/**
 * Returns all tasks for board from data base with status code 200.
 *
 * @param req - (TaskReq)  client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const getTasks = (req: TaskReq, reply: FastifyReply): void => {
  const { boardId } = req.params;
  const currentTasks = tasks.tasks.filter(it => it.boardId === boardId);
  reply.send(currentTasks);
};

/**
 * Creates task with status code 201.
 *
 * @param req - (TaskReq)  client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const addTask = (req: TaskReq, reply: FastifyReply): void => {
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

/**
 * Returns single task from data base by task id with status code 200.
 *
 * @param req - (TaskReq)  client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const getTask = (req: TaskReq, reply: FastifyReply): void => {
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

/**
 * Updates task by task id with status code 200.
 *
 * @param req - (TaskReq)  client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const updateTask = (req: TaskReq, reply: FastifyReply): void => {
  const { taskId } = req.params;

  const { title, order, description, userId, boardId, columnId } = req.body;

  tasks.tasks = tasks.tasks.map(task => (task.id === taskId ? {
    id: taskId,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  } : task));

  const updatedTask = tasks.tasks.find(task => task.id === taskId);

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(updatedTask);
};

/**
 * Removes task by task id with status code 200.
 *
 * @param req - (TaskReq)  client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const deleteTask = (req: TaskReq, reply: FastifyReply): void => {
  const { taskId } = req.params;
  tasks.tasks = tasks.tasks.filter(it => it.id !== taskId);
  reply.send({ message: `Task ${taskId} has been deleted` });
};
