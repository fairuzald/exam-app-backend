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
import { PartialType } from '@nestjs/mapped-types';

export class CreateQuestionOptionDto {
  @IsString({ message: 'Alphabet must be a string' })
  @IsNotEmpty({ message: 'Alphabet is required' })
  @IsAlpha()
  alphabet: string;

  @IsString({ message: 'Option text must be a string' })
  @IsOptional()
  @MaxLength(500, { message: 'Option text is too long' })
  optionText?: string;

  @IsInt({ message: 'Points must be an integer' })
  @Min(0, { message: 'Points must be greater than or equal to 0' })
  points: number;

  @IsUUID()
  @IsNotEmpty({ message: 'Question ID is required' })
  questionId: string;
}

export class UpdateQuestionOptionDto extends PartialType(
  CreateQuestionOptionDto,
) {}
