import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
