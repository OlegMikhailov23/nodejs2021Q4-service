import { FastifyReply } from 'fastify';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { LoginReq } from '../interfaces/interfaces';
const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');

const signToken = (user: User, reply:FastifyReply ): string => {
  const { id, login } = user
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY, {expiresIn: '120m'});
  return token;
};

export const loginUser = async (req: LoginReq, reply: FastifyReply): Promise<void> => {
  const { login, password } = req.body;
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { password, login }});
  if (user) {
    const token = signToken(user, reply);
    reply
      .code(200)
      .send(token)
  }

  reply
    .code(403)
    .send({ message: `Wrong user login/password` });
};
