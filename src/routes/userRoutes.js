const { getUsers, addUser, getUser, deleteUser, updateUser } = require('../controllers/usersController');
const { User } = require('../models/models');

const getUsersOpts = {
  schema: {
    response: {
      201: User
    }
  },
  handler: getUsers
};

const getSingleUserOpts = {
  schema: {
    response: {
      201: User
    }
  },
  handler: getUser
};

const updateUserOpts = {
  schema: {
    response: {
      200: User
    }
  },
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
  handler: deleteUser
}

function userRoutes(app, options, done) {
  // Get all users
  app.get('/users', getUsersOpts);

  // Get single items
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
