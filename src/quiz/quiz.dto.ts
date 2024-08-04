import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsInt,
  IsBoolean,
  IsEnum,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateQuizDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(255, { message: 'Title is too long' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  duration?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsEnum(['easy', 'medium', 'hard'])
  @IsOptional()
  difficulty?: string;

  @IsString()
  @IsOptional()
  instruction?: string;

  @IsBoolean()
  @IsOptional()
  isRandomized?: boolean;

  @IsUUID()
  @IsNotEmpty({ message: 'User ID is required' })
  createdById: string;
}

import { PartialType } from '@nestjs/mapped-types';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {}
