import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { users, tasks } from '../db/db';
import { UserReq } from '../interfaces/interfaces';
import { myLogger, loggerMessages } from '../logger';


/**
 * Returns all users from data base with status code 200.
 *
 * @param req - (FastifyRequest) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const getUsers = (req: FastifyRequest, reply: FastifyReply): void => {
    throw Error()
    const usersWithoutPassword = users.users?.map(user => (
      {
        name: user.name,
        login: user.login,
        id: user.id
      }
    ));

    reply
      .code(200)
      .send(usersWithoutPassword);

    myLogger.info(loggerMessages.getAll(req.method ,req.url, 200));
};

/**
 * Returns single user from data base by id with status code 200.
 *
 * @param req - (UserReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const getUser = (req: UserReq, reply: FastifyReply): void => {
  const { id } = req.params;
  const user = users.users.find(it => it.id === id);

  if (!user) {
    reply
      .code(404)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ message: `User ${id} does not exist` });
  }

  const userWithoutPassword = {
    name: user?.name,
    login: user?.login,
    id: user?.id
  };

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(userWithoutPassword);

  myLogger.info(loggerMessages.getSingle(req.method ,req.url, req.params.id, 200))
};

/**
 * Creates user with status code 201.
 *
 * @param req - (UserReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const addUser = (req: UserReq, reply: FastifyReply): void => {
  const { name, login, password } = req.body;

  const user = {
    id: uuidv4(),
    name,
    login,
    password
  };
  users.users = [...users.users, user];

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    login: user.login
  };

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(userWithoutPassword);

  myLogger.info(loggerMessages.addItem(req.method ,req.url,201, req.body))
};

/**
 * Removes user by id with status code 200.
 *
 * @param req - (UserReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const deleteUser = (req: UserReq, reply: FastifyReply): void => {
  const { id } = req.params;

  tasks.tasks = tasks.tasks.map(task => (task.userId === id ? {
    id: task.id,
    title: task.title,
    order: task.order,
    description: task.description,
    userId: null,
    boardId: task.boardId,
    columnId: task.columnId
  } : task));

  users.users = users.users.filter(it => it.id !== id);
  reply
    .code(200)
    .send({ message: `Item ${id} has been deleted` });
  myLogger.info(loggerMessages.deleteItem(req.method ,req.url,req.params.id, 200))
};

/**
 * Updates user by id with status code 200.
 *
 * @param req - (UserReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const updateUser = (req: UserReq, reply: FastifyReply): void => {
  const { id } = req.params;

  const { name, login, password } = req.body;

  users.users = users.users.map(user => (user.id === id ? { id, name, login, password } : user));

  const updatedUser = users.users.find(user => user.id === id);

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(updatedUser);

  myLogger.info(loggerMessages.updateItem(req.method ,req.url,req.params.id, 200, req.body))
};
