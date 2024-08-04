import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
  Put,
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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    try {
      const result = await this.userService.register(registerDto);
      return response.status(201).json(result);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post('activate')
  @ApiOperation({ summary: 'Activate a user account' })
  @ApiResponse({ status: 201, description: 'User activated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
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
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    try {
      const result = await this.userService.login(loginDto);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Get('me')
  @ApiOperation({ summary: 'Get logged-in user details' })
  @ApiResponse({
    status: 200,
    description: 'User details retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
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
  @ApiOperation({ summary: 'Request a password reset' })
  @ApiResponse({ status: 200, description: 'Password reset link sent' })
  @ApiResponse({ status: 400, description: 'Bad request' })
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
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
  @ApiResponse({ status: 400, description: 'Bad request' })
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
  @ApiOperation({ summary: 'Logout a user' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
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
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async findAllUsers(@Res() response: Response) {
    try {
      const users = await this.userService.findAllUsers();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Put('user')
  @ApiOperation({ summary: 'Update user details' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
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
