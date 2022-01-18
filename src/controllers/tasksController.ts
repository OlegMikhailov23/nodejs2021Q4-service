import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm';
import { FastifyReply } from 'fastify';
import { Task } from '../entities/Task';
import { TaskReq } from '../interfaces/interfaces';
import { loggerMessages, myLogger } from '../logger';

/**
 * Returns all tasks for board from data base with status code 200.
 *
 * @param req - (TaskReq)  client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const getTasks = async (req: TaskReq, reply: FastifyReply): Promise<void> => {
  const { boardId } = req.params;
  const taskRepository = getRepository(Task);
  const currentTasks = await taskRepository.find({ where: { boardId: boardId } });
  reply.send(currentTasks);

  myLogger.info(loggerMessages.getAll(req.method, req.url, 200));
};

/**
 * Creates task with status code 201.
 *
 * @param req - (TaskReq)  client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const addTask = async (req: TaskReq, reply: FastifyReply): Promise<void> => {
  const { title, order, description, userId } = req.body;
  const { boardId } = req.params;
  const taskRepository = getRepository(Task);

  const task = await taskRepository.create();
  task.id = uuidv4();
  task.title = title;
  task.order = order;
  task.description = description;
  task.userId = userId;
  task.boardId = boardId;
  task.columnId = null;
  await taskRepository.save(task);

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(task);

  myLogger.info(loggerMessages.addItem(req.method, req.url, 201, req.body));
};

/**
 * Returns single task from data base by task id with status code 200.
 *
 * @param req - (TaskReq)  client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const getTask = async (req: TaskReq, reply: FastifyReply): Promise<void> => {
  const { taskId } = req.params;
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(taskId);

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

  myLogger.info(loggerMessages.getSingle(req.method, req.url, req.params.taskId, 200));
};

/**
 * Updates task by task id with status code 200.
 *
 * @param req - (TaskReq)  client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const updateTask = async (req: TaskReq, reply: FastifyReply): Promise<void> => {
  const { taskId } = req.params;
  const { title, order, description, userId, boardId, columnId } = req.body;
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(taskId);

  if (task) {
    const updatedTask = taskRepository.merge(
      task,
      { title },
      { order },
      { description },
      { userId },
      { boardId },
      { columnId }
    );

    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(updatedTask);
  }

  reply
    .code(404)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ message: `Task ${taskId} does not exist` });

  myLogger.info(loggerMessages.updateItem(req.method, req.url, req.params.taskId, 200, req.body));
};

/**
 * Removes task by task id with status code 200.
 *
 * @param req - (TaskReq)  client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const deleteTask = async (req: TaskReq, reply: FastifyReply): Promise<void> => {
  const { taskId } = req.params;
  const taskRepository = getRepository(Task);
  await taskRepository.delete(taskId);
  reply
    .code(200)
    .send({ message: `Task ${taskId} has been deleted` });

  myLogger.info(loggerMessages.deleteItem(req.method, req.url, req.params.taskId, 200));
};
