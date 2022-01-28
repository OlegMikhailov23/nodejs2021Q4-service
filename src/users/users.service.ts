import { Body, Injectable, Req } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from "../interfaces";
import { tasks } from "../fake-db";

@Injectable()
export class UsersService {
  userStorage: User[] = [];

  create(@Body() createUserDto: CreateUserDto, @Req() req) {
    const { name, login, password } = req.body;

    const user = {
      id: uuidv4(),
      name,
      login,
      password
    };
    this.userStorage = [...this.userStorage, user];

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      login: user.login
    };

    return userWithoutPassword
  }

  findAll() {
    const usersWithoutPassword = this.userStorage.map(user => (
      {
        name: user.name,
        login: user.login,
        id: user.id
      }
    ));

    return usersWithoutPassword;
  }

  findOne(id: string, res) {
    const user = this.userStorage.find(it => it.id === id);

    if (!user) {
      res
        .code(404)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: `User ${id} does not exist` });
    }

    const userWithoutPassword = {
      name: user?.name,
      login: user?.login,
      id: user?.id
    };

    res
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(userWithoutPassword);
  }

  update(id: string, updateUserDto: UpdateUserDto, req) {
    const { name, login, password } = req.body;

    this.userStorage = this.userStorage.map(user => (user.id === id ? { id, name, login, password } : user));

    const updatedUser = this.userStorage.find(user => user.id === id);

    return updatedUser;
  }

  remove(id: string) {
    tasks.tasks = tasks.tasks.map(task => (task.userId === id ? {
      id: task.id,
      title: task.title,
      order: task.order,
      description: task.description,
      userId: null,
      boardId: task.boardId,
      columnId: task.columnId
    } : task));

    this.userStorage = this.userStorage.filter(it => it.id !== id);

    return `This action removes a #${id} user`;
  }
}
