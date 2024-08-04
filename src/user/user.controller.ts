import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  RegisterDto,
  ActivationDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UpdateUserDto,
} from './user.dto';
import { Response, Request } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    try {
      const result = await this.userService.register(registerDto);
      return response.status(201).json(result);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post('activate')
  async activateUser(
    @Body() activationDto: ActivationDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.userService.activateUser(activationDto);
      return response.status(201).json(res);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    try {
      const result = await this.userService.login(loginDto);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getLoggedInUser(@Req() request: Request, @Res() response: Response) {
    try {
      const user = await this.userService.getLoggedInUser(request);
      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Res() response: Response,
  ) {
    try {
      await this.userService.forgotPassword(forgotPasswordDto);
      return response.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() response: Response,
  ) {
    try {
      await this.userService.resetPassword(resetPasswordDto);
      return response
        .status(200)
        .json({ message: 'Password reset successful' });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() request: Request, @Res() response: Response) {
    try {
      await this.userService.logout(request);
      return response.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Get('all')
  async findAllUsers(@Res() response: Response) {
    try {
      const users = await this.userService.findAllUsers();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post('update')
  @UseGuards(AuthGuard)
  async updateUser(
    @Body() updateDto: UpdateUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const result = await this.userService.updateUser(updateDto, request);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
