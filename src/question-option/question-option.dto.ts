import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  MaxLength,
  IsAlpha,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateQuestionOptionDto {
  @ApiProperty({
    description: 'Alphabet representing the option',
    example: 'A',
  })
  @IsString({ message: 'Alphabet must be a string' })
  @IsNotEmpty({ message: 'Alphabet is required' })
  @IsAlpha()
  alphabet: string;

  @ApiPropertyOptional({
    description: 'Text of the option',
    maxLength: 500,
  })
  @IsString({ message: 'Option text must be a string' })
  @IsOptional()
  @MaxLength(500, { message: 'Option text is too long' })
  optionText?: string;

  @ApiProperty({
    description: 'Points assigned to the option',
    example: 10,
  })
  @IsInt({ message: 'Points must be an integer' })
  @Min(0, { message: 'Points must be greater than or equal to 0' })
  points: number;

  @ApiProperty({
    description: 'ID of the question that this option belongs to',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Question ID is required' })
  questionId: string;
}

export class UpdateQuestionOptionDto extends PartialType(
  CreateQuestionOptionDto,
) {}
