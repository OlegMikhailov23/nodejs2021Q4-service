import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { markUp } from './markup';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(@Res() res: Response) {
    res
      .status(HttpStatus.OK)
      .type('text/html; charset=utf-8')
      .send(`${markUp()}`);
  }
}
