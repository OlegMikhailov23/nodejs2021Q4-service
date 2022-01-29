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
import { Response, Request } from 'express';
import { BoardReq } from '../interfaces';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto, @Req() req: BoardReq) {
    return this.boardsService.create(createBoardDto, req);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.boardsService.findOne(id, res);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @Req() req: Request,
  ) {
    return this.boardsService.update(id, updateBoardDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}
