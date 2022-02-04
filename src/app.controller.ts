import { Controller, Request, Post, UseGuards, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserReq } from './interfaces';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: UserReq) {
    return this.authService.login(req.user);
  }

  @Get()
  getHello(@Res() res: Response): void {
    return this.appService.getHello(res);
  }
}
