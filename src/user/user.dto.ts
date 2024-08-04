import { PartialType } from '@nestjs/mapped-types';
import { UserRole } from './user.entity';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// This is a DTO (Data Transfer Object) class for Querying and Mutating the User entity

// Register properties for creating a new user
export class RegisterDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  role?: UserRole;
}

// Activation properties for activating a user account
export class ActivationDto {
  @IsNotEmpty({ message: 'Activation token is required' })
  activationToken: string;

  @IsString({ message: 'Activation code must be a string' })
  @IsNotEmpty({ message: 'Activation code is required' })
  activationCode: string;
}

// Login properties
export class LoginDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;
}

// Forgot password properties
export class ForgotPasswordDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
}

// Reset password properties
export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Reset token is required' })
  activationToken: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;
}

// Update user properties
export class UpdateUserDto extends PartialType(RegisterDto) {}
