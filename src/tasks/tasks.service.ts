import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { Task } from '../entities/Task';
import { getRepository } from 'typeorm';

@Injectable()
export class TasksService {
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

    return createTaskDto;
  }

  async findAll(boardId: string): Promise<Task[]> {
    const taskRepository = getRepository(Task);
    const currentTasks = await taskRepository.find({ where: { boardId } });

    return currentTasks;
  }

  async findOne(id: string, res: Response): Promise<void> {
    const taskRepository = getRepository(Task);
    const task = await taskRepository.findOne(id);

    if (!task) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Task ${id} does not exist` });
    }

    res.status(HttpStatus.OK).send(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const taskRepository = getRepository(Task);
    const task = await taskRepository.findOne(id);
    const updatedTask = taskRepository.merge(task, updateTaskDto);

    await taskRepository.save(updatedTask);

    return updatedTask;
  }

  async remove(id: string): Promise<string> {
    const taskRepository = getRepository(Task);
    await taskRepository.delete(id);
    return `This action removes a #${id} task`;
  }
}
