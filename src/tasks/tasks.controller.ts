import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import { Task } from '../entities/Task';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Partial<Task>> {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Param('boardId') boardId: string): Promise<Task[]> {
    return this.tasksService.findAll(boardId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    return this.tasksService.findOne(id, res);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return this.tasksService.remove(id);
  }
}
