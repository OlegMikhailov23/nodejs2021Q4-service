import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Req,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Response } from 'express';
import { BoardReq } from '../interfaces';
import { Board } from '../entities/Board';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @Req() req: BoardReq,
  ): Promise<Board> {
    return this.boardsService.create(createBoardDto, req);
  }

  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    return this.boardsService.findOne(id, res);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return this.boardsService.remove(id);
  }
}
