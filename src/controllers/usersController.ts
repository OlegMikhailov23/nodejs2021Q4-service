import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import {users, tasks} from '../db/db';
import { UserReq } from '../interfaces/interfaces';

export const getUsers = (req: FastifyRequest, reply: FastifyReply) => {
  const usersWithoutPassword = users.users?.map(user => (
      {
        name: user.name,
        login: user.login,
        id: user.id,
      }
    ));

  reply.send(usersWithoutPassword);
};

export const getUser = (req: UserReq, reply: FastifyReply) => {
  const { id } = req.params;
  const user = users.users.find(it => it.id === id);

  if (!user) {
    reply
      .code(404)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({message : `User ${id} does not exist`} );
  }

  const userWithoutPassword = {
    name: user?.name,
    login: user?.login,
    id: user?.id,
  }

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(userWithoutPassword);
}

export const addUser = (req: UserReq, reply: FastifyReply) => {
  const { name, login, password } = req.body;

  const user = {
    id: uuidv4(),
    name,
    login,
    password,
  };
  users.users = [...users.users, user];

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    login: user.login
  }

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(userWithoutPassword);
};

export const deleteUser = (req: UserReq, reply: FastifyReply) => {
  const {id} = req.params;

  tasks.tasks = tasks.tasks.map(task => (task.userId === id ? {
    id: task.id,
    title: task.title,
    order: task.order,
    description: task.description,
    userId: null,
    boardId: task.boardId,
    columnId: task.columnId,
  } : task))

  users.users = users.users.filter(it => it.id !== id);

  reply.send({message: `Item ${id} has been deleted`});
}

export const updateUser = (req : UserReq, reply: FastifyReply) => {
  const {id} = req.params;

  const {name, login, password} = req.body

  users.users = users.users.map(user => (user.id === id ? {id, name, login, password} : user))

  const updatedUser = users.users.find(user => user.id === id)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(updatedUser);
}
