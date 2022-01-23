import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { hashPassword } from './hashUtil';
import { myLogger } from '../logger';

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'admin';

export const createDefaultUser = async (): Promise<void> => {
  const userRepository = getRepository(User);
  const isDefaultUserCreated = await userRepository.findOne({ where: { login: ADMIN_LOGIN } })
  if (isDefaultUserCreated === undefined) {
    const hashedPassword = await hashPassword(ADMIN_PASSWORD);
    const user = await userRepository.create();
    user.id = uuidv4();
    user.name = ADMIN_LOGIN;
    user.login = ADMIN_LOGIN;
    user.password = hashedPassword;
    await userRepository.save(user);
    myLogger.info('Default user has been created');
  }

  
};

