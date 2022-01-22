import { FastifyReply, FastifyRequest } from 'fastify';

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');


// @ts-ignore
export const checkAuth = async (req: FastifyRequest, reply: FastifyReply, next) => {
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
        const res = jwt.verify(token, JWT_SECRET_KEY);
        console.log(res)
      } catch (e) {
        reply.status(401).send('Unauthorized user')
      }

      return next();
    }
  }

};
