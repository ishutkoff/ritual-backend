import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.chema';
import { CreateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findUserByLogin(login: string) {
    return await this.userModel.findOne({ login: login }).exec();
  }

  async createUser(user: CreateUserDto): Promise<CreateUserDto> {
    if (await this.findUserByLogin(user.login))
      throw new BadRequestException(AppError.USER_EXIST);
    user.password = await this.hashPassword(user.password);
    return await new this.userModel(user).save();
  }

  async publicUser(login: string) {
    return await this.userModel.findOne({ login }, { password: 0 });
  }
}
