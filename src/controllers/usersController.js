const { v4: uuidv4 } = require('uuid');
const { users } = require('../db/db');

const getUsers = (req, reply) => {
  const usersWithoutPassword = users.users.map(user => (
      {
        name: user.name,
        login: user.login,
        id: user.id,
      }
    ));

  reply.send(usersWithoutPassword);
};

const getUser = (req, reply) => {
  const {id} = req.params;
  const user = users.users.find(it => it.id === id);

  if (!user) {
    reply
      .code(404)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({message : `User ${id} does not exist`} );
  }

  const userWithoutPassword = {
    name: user.name,
    login: user.login,
    id: user.id,
  }

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(userWithoutPassword);
}

const addUser = (req, reply) => {
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

const deleteUser = (req, reply) => {
  const {id} = req.params;
  users.users = users.users.filter(it => it.id !== id)

  reply.send({message: `Item ${id} has been deleted`})
}

const updateUser = (req, reply) => {
  const {id} = req.params;

  const {name, login, password} = req.body

  users.users = users.users.map(user => (user.id === id ? {id, name, login, password} : user))

  const updatedUser = users.users.find(user => user.id === id)

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(updatedUser);
}

module.exports = {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser
};
