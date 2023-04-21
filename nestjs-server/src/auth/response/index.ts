import { IsNotEmpty, IsString } from 'class-validator';

export class AuthUserResponse {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
