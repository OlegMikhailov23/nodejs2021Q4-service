import { FastifyInstance } from 'fastify';
// import { User } from '../models/models';
import { loginUser } from '../controllers/loginContoller';

const loginUserOpts = {
  schema: {
    body: { // Validate Auth request
      type: 'object',
      required: ['login', 'password'],
      properties: {
        login: {type: 'string'},
        password: {type: 'string'}
      },
    },

  },
  handler: loginUser
};

function loginRoute(app: FastifyInstance, options: object, done: () => void): void {
  // Post login
  app.post('/login', loginUserOpts);

  done();
}

module.exports = loginRoute;
