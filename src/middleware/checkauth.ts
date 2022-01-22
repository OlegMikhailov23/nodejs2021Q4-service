import { FastifyReply, FastifyRequest } from 'fastify';

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

export const checkAuth = async (req: FastifyRequest, reply: FastifyReply, next: Function) => {
  const {headers} = req.raw
  const authHeader = headers.authorization;

  if (authHeader !== undefined) {
    const tokenString = authHeader;

    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      reply
        .status(401)
        .send('Unauthorized user')
    } else {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
      } catch (e) {
        reply.status(401).send('Unauthorized user')
      }

      return next();
    }
  }

};
