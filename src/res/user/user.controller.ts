import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/main')
  getMainPage() {
    return this.userService.getMainPage();
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.userService.register(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  async getUserInfo() {
    return 'user-info Page';
  }
}
