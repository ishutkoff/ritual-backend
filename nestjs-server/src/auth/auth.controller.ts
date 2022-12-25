import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateUserDto, LoginUserDto } from 'src/users/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async registerUser(@Body() body: CreateUserDto) {
    return await this.authService.registerUser(body);
  }

  @Post('login')
  async loginUser(@Body() body: LoginUserDto) {
    return await this.authService.loginUser(body);
  }
}
