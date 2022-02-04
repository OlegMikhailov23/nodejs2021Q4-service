import { Body, Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserReq } from '../interfaces';
import { User } from '../entities/User';
import { Response } from 'express';
import { getRepository } from 'typeorm';
import { hashPassword } from '../utils';
import { Task } from '../entities/Task';

@Injectable()
export class UsersService {
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    const userRepository = getRepository(User);
    // const hashedPassword = await hashPassword(createUserDto.password);
    await userRepository.create();
    createUserDto.id = uuidv4();
    // createUserDto.password = hashedPassword;
    await userRepository.save(createUserDto);

    const userWithoutPassword = {
      id: createUserDto.id,
      name: createUserDto.name,
      login: createUserDto.login,
    };

    return userWithoutPassword;
  }

  async findAll(): Promise<User[]> {
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ['id', 'name', 'login'],
    });

    return users;
  }

  async findOne(id: string, res: Response): Promise<void> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);

    if (!user) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `User ${id} does not exist` });
    }

    const userWithoutPassword = {
      name: user?.name,
      login: user?.login,
      id: user?.id,
    };

    res.status(HttpStatus.OK).send(userWithoutPassword);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    req: UserReq,
  ): Promise<User> {
    const { password } = req.body;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);
    req.body.password = await hashPassword(password);

    const updatedUser = userRepository.merge(user, req.body);
    await userRepository.save(updatedUser);

    return updatedUser;
  }

  async remove(id: string): Promise<string> {
    const userRepository = getRepository(User);
    const taskRepository = getRepository(Task);
    const tasks = await taskRepository.find({ userId: id });

    for (let i = 0; i < tasks.length; i += 1) {
      const task = tasks[i];
      const updatedTask = taskRepository.merge(task, { userId: null });
      await taskRepository.save(updatedTask);
    }

    await userRepository.delete(id);

    return `This action removes a #${id} user`;
  }

  async findOneByLogin(login: string): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { login } });
    return user;
  }
}
