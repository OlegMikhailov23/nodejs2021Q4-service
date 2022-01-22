import { FastifyInstance } from 'fastify';
import { getUsers, addUser, getUser, deleteUser, updateUser } from '../controllers/usersController';
import { User} from '../models/models'
import { checkAuth } from '../middleware/checkauth';

const getUsersOpts = {
  schema: {
    response: {
      201: User
    }
  },
  preHandler:  [checkAuth],
  handler: getUsers
};

const getSingleUserOpts = {
  schema: {
    response: {
      201: User
    }
  },
  preHandler:  [checkAuth],
  handler: getUser
};

const updateUserOpts = {
  schema: {
    response: {
      200: User
    }
  },
  preHandler:  [checkAuth],
  handler: updateUser
};

const postUserOpts = {
  schema: {
    body: { // Validate User
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: User.properties,
    },
    response: {
      200: User
    }
  },
  preHandler:  [checkAuth],
  handler: addUser
};

const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {type: 'string'}
        }
      }
    }
  },
  preHandler:  [checkAuth],
  handler: deleteUser
}

function userRoutes(app: FastifyInstance, options: object, done: () => void) {
  // Get all users
  app.get('/users', getUsersOpts);


  app.get('/users/:id', getSingleUserOpts)

  // Add user
  app.post('/users', postUserOpts)

  // Delete user
  app.delete('/users/:id', deleteUserOpts)

  // Delete user
  app.put('/users/:id', updateUserOpts)

  done();
}

module.exports = userRoutes;

