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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({
    description: 'Title of the quiz',
    maxLength: 255,
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(255, { message: 'Title is too long' })
  title: string;

  @ApiProperty({
    description: 'Description of the quiz',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiPropertyOptional({
    description: 'Duration of the quiz in minutes',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  duration?: number;

  @ApiPropertyOptional({
    description: 'Whether the quiz is published or not',
  })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({
    description: 'Difficulty level of the quiz',
    enum: ['easy', 'medium', 'hard'],
  })
  @IsEnum(['easy', 'medium', 'hard'])
  @IsOptional()
  difficulty?: string;

  @ApiPropertyOptional({
    description: 'Instructions for the quiz',
  })
  @IsString()
  @IsOptional()
  instruction?: string;

  @ApiPropertyOptional({
    description: 'Whether the questions are randomized or not',
  })
  @IsBoolean()
  @IsOptional()
  isRandomized?: boolean;

  @ApiProperty({
    description: 'ID of the user who created the quiz',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'User ID is required' })
  createdById: string;
}

import { PartialType } from '@nestjs/mapped-types';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {}
