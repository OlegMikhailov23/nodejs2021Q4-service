import { FastifyReply } from 'fastify';
import { getRepository } from 'typeorm';
import { loggerMessages, myLogger } from '../logger';
import { User } from '../entities/User';
// import {sign, verify} from 'jsonwebtoken';
import { LoginReq } from '../interfaces/interfaces';


export const loginUser = async (req: LoginReq, reply: FastifyReply): Promise<void> => {
  const { login, password } = req.body;
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { password, login } });

  if (user) {
    console.log(user, 'нашли', password);

    reply
      .code(200)
      .send(user);
  }

  myLogger.info(loggerMessages.getAll(req.method, req.url, 200));
};
