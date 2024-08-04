import { PartialType } from '@nestjs/mapped-types';
import { UserRole } from './user.entity';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Register properties for creating a new user
export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: 'johndoe', description: 'Username of the user' })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiProperty({
    example: 'john.doe@egmail',
    description: 'Email of the user',
  })
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'Role of the user',
    required: false,
  })
  role?: UserRole;
}

// Activation properties for activating a user account
export class ActivationDto {
  @ApiProperty({ example: 'activation-token', description: 'Activation token' })
  @IsNotEmpty({ message: 'Activation token is required' })
  activationToken: string;

  @ApiProperty({ example: '123456', description: 'Activation code' })
  @IsString({ message: 'Activation code must be a string' })
  @IsNotEmpty({ message: 'Activation code is required' })
  activationCode: string;
}

// Login properties
export class LoginDto {
  @ApiProperty({
    example: 'john.doe@egmail',
    description: 'Email of the user',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;
}

// Forgot password properties
export class ForgotPasswordDto {
  @ApiProperty({
    example: 'john.doe@egmail',
    description: 'Email of the user',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
}

// Reset password properties
export class ResetPasswordDto {
  @ApiProperty({ example: 'reset-token', description: 'Reset token' })
  @IsNotEmpty({ message: 'Reset token is required' })
  activationToken: string;

  @ApiProperty({ example: 'newpassword123', description: 'New password' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;
}

// Update user properties
export class UpdateUserDto extends PartialType(RegisterDto) {}
