import { FastifyReply } from 'fastify';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { LoginReq } from '../interfaces/interfaces';
import { checkHashedPassword } from '../utils/hashUtil';

const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');

const signToken = async (user: User, password: string): Promise<string | null> => {
  const { password: hashedPassword } = user;
  const comparisonRes = await checkHashedPassword(password, hashedPassword);
  if (comparisonRes) {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '120m' });
    return token;
  }

  return null
};

export const loginUser = async (req: LoginReq, reply: FastifyReply): Promise<void> => {
  const { login, password } = req.body;
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { login } });
  if (user) {
    const token = await signToken(user, password);
    reply
      .code(200)
      .send(token);
  }

  reply
    .code(403)
    .send({ message: `Wrong user login/password` });
};
