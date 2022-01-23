import { FastifyReply, FastifyRequest } from 'fastify';

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

// @ts-ignore
export const checkAuth = (req: FastifyRequest, reply: FastifyReply, next) => {
  const { headers } = req.raw;
  const authHeader = headers.authorization;
  if (authHeader !== undefined) {
    const tokenString = authHeader;
    const [type, token] = tokenString.split(' ');
    if (type !== 'Bearer') {

      reply
        .status(401)
        .send('Unauthorized user');
    } else {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
      } catch (e) {

        reply
          .status(401)
          .send('Unauthorized user');
      }

      return next();
    }
  }

  reply.status(401).send('Unauthorized user');
};
