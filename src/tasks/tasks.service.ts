import { Body, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuidv4 } from 'uuid';
import { tasks } from '../fake-db';
import { TaskReq } from '../interfaces';
import { Response } from 'express';

@Injectable()
export class TasksService {
  create(
    boardId: string,
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: TaskReq,
  ) {
    const { title, order, description, userId } = req.body;
    const task = {
      id: uuidv4(),
      title,
      order,
      description,
      userId,
      boardId,
      // @ts-ignore
      columnId: null,
    };

    tasks.tasks = [...tasks.tasks, task];

    return task;
  }

  // findAll(boardId: string) {
  //   const currentTasks = tasks.tasks.filter((it) => it.boardId === boardId);
  //
  //   return currentTasks;
  // }

  // findOne(id: string, res: Response) {
  //   const task = tasks.tasks.find((it) => it.id === id);
  //
  //   if (!task) {
  //     res
  //       .status(HttpStatus.NOT_FOUND)
  //       .send({ message: `Task ${id} does not exist` });
  //   }
  //
  //   res.status(HttpStatus.OK).send(task);
  // }

  update(id: string, updateTaskDto: UpdateTaskDto, req: TaskReq) {
    const { title, order, description, userId, boardId, columnId } = req.body;

    tasks.tasks = tasks.tasks.map((task) =>
      task.id === id ?
         {
            id,
            title,
            order,
            description,
            userId,
            boardId,
            columnId,
          }
        : task,
    );

    const updatedTask = tasks.tasks.find((task) => task.id === id);

    return updatedTask;
  }

  // remove(id: string) {
  //   tasks.tasks = tasks.tasks.filter((it) => it.id !== id);
  //   return `This action removes a #${id} task`;
  // }
}
