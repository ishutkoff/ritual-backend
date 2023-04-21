import { BadRequestException, Injectable } from '@nestjs/common';
import { AppError } from 'src/common/constants/errors';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(user: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.usersService.findUserByLogin(user.login);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    await this.usersService.createUser(user);
    const publicUser = await this.usersService.publicUser(user.login);
    return publicUser;
  }

  async loginUser(user: LoginUserDto): Promise<AuthUserResponse> {
    const existUser = await this.usersService.findUserByLogin(user.login);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      user.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    const token = await this.tokenService.generateJwtToken(user.login);
    const publicUser = await this.usersService.publicUser(user.login);
    return { ...publicUser, token };
  }
}
