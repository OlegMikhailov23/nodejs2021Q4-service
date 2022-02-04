import { Injectable } from '@nestjs/common';
import { checkHashedPassword } from '../utils';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/User';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByLogin(login);
    const comparisonRes = await checkHashedPassword(password, user.password);
    if (user && comparisonRes) {
      return user;
    }
    return null;
  }

  async login(user: Partial<User>) {
    const payload = { login: user.login, password: user.password };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
