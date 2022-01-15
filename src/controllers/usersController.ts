import { FastifyReply, FastifyRequest } from 'fastify';
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
// import {
  // users,
  // tasks
// } from '../db/db';
import { UserReq } from '../interfaces/interfaces';
import { myLogger, loggerMessages } from '../logger';
import { User } from '../entities/User.entity';


/**
 * Returns all users from data base with status code 200.
 *
 * @param req - (FastifyRequest) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const getUsers = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const userRepository = getRepository(User);
  const users = await userRepository.find({ select: ['id', 'name', 'login'] });

  reply
    .code(200)
    .send(users);

  myLogger.info(loggerMessages.getAll(req.method, req.url, 200));
};

/**
 * Returns single user from data base by id with status code 200.
 *
 * @param req - (UserReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const getUser = async (req: UserReq, reply: FastifyReply): Promise<void>  => {
  const { id } = req.params;
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);

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

  myLogger.info(loggerMessages.getSingle(req.method, req.url, req.params.id, 200));
};

/**
 * Creates user with status code 201.
 *
 * @param req - (UserReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const addUser = async (req: UserReq, reply: FastifyReply): Promise<void> => {
  const { name, login, password } = req.body;
  const userRepository = getRepository(User);
  const user = await userRepository.create()
  user.id = uuidv4();
  user.name = name;
  user.login = login;
  user.password = password;
  await userRepository.save(user);

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    login: user.login
  };

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(userWithoutPassword);

  myLogger.info(loggerMessages.addItem(req.method, req.url, 201, req.body));
};

/**
 * Removes user by id with status code 200.
 *
 * @param req - (UserReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const deleteUser = async (req: UserReq, reply: FastifyReply): Promise<void> => {
  const { id } = req.params;
  const userRepository = getRepository(User);
  await userRepository.delete(id);


  // tasks.tasks = tasks.tasks.map(task => (task.userId === id ? {
  //   id: task.id,
  //   title: task.title,
  //   order: task.order,
  //   description: task.description,
  //   userId: null,
  //   boardId: task.boardId,
  //   columnId: task.columnId
  // } : task));

  reply
    .code(200)
    .send({ message: `User ${id} has been deleted` });
  myLogger.info(loggerMessages.deleteItem(req.method, req.url, req.params.id, 200));
};

/**
 * Updates user by id with status code 200.
 *
 * @param req - (UserReq) client request
 * @param reply - (FastifyReply) server response
 * @returns void
 *
 */

export const updateUser = async (req: UserReq, reply: FastifyReply): Promise<void> => {
  const { id } = req.params;
  // const { name, login, password } = req.body;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  if (user) {
    const updatedUser = userRepository.merge(user, req.body);
    await userRepository.save(updatedUser);

    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(updatedUser);
  }

  reply
    .code(404)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ message: 'User not found' });

  myLogger.info(loggerMessages.updateItem(req.method, req.url, req.params.id, 200, req.body));
};
