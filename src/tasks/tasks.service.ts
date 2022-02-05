import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { Task } from '../entities/Task';
import { getRepository } from 'typeorm';
import { loggerMessages, myLogger } from '../logger';

@Injectable()
export class TasksService {
  url = '/boards/:boardId/tasks';

  async create(
    boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Partial<Task>> {
    const taskRepository = getRepository(Task);

    await taskRepository.create();
    createTaskDto.boardId = boardId;
    createTaskDto.id = uuidv4();
    createTaskDto.columnId = null;
    await taskRepository.save(createTaskDto);
    myLogger.info(
      loggerMessages.addItem(this.url, HttpStatus.CREATED, createTaskDto),
    );

    return createTaskDto;
  }

  async findAll(boardId: string): Promise<Task[]> {
    const taskRepository = getRepository(Task);
    const currentTasks = await taskRepository.find({ where: { boardId } });
    myLogger.info(loggerMessages.getAll(this.url, HttpStatus.OK));

    return currentTasks;
  }

  async findOne(id: string, res: Response): Promise<void> {
    const taskRepository = getRepository(Task);
    const task = await taskRepository.findOne(id);

    if (!task) {
      myLogger.warn(
        loggerMessages.getSingle(this.url, id, HttpStatus.NOT_FOUND),
      );
      res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Task ${id} does not exist` });
    }

    myLogger.info(loggerMessages.getSingle(this.url, id, HttpStatus.OK));
    res.status(HttpStatus.OK).send(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const taskRepository = getRepository(Task);
    const task = await taskRepository.findOne(id);
    const updatedTask = taskRepository.merge(task, updateTaskDto);

    await taskRepository.save(updatedTask);
    myLogger.info(
      loggerMessages.updateItem(this.url, id, HttpStatus.OK, updateTaskDto),
    );
    return updatedTask;
  }

  async remove(id: string): Promise<string> {
    const taskRepository = getRepository(Task);
    await taskRepository.delete(id);
    myLogger.info(loggerMessages.deleteItem(this.url, id, HttpStatus.OK));

    return `This action removes a #${id} task`;
  }
}
