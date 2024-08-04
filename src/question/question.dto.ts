// src/question/dto/create-question.dto.ts
import {
  IsString,
  IsEnum,
  IsInt,
  Min,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateQuestionDto {
  @IsString({ message: 'Question must be a string' })
  @IsNotEmpty({ message: 'Question is required' })
  question: string;

  @IsEnum(
    ['multiple-choice', 'true-false', 'short-answer', 'essay', 'checkbox'],
    { message: 'Invalid question type' },
  )
  questionType:
    | 'multiple-choice'
    | 'true-false'
    | 'short-answer'
    | 'essay'
    | 'checkbox';

  @IsInt({ message: 'Max points must be an integer' })
  @Min(0, { message: 'Max points must be greater than or equal to 0' })
  maxPoints: number;

  @IsOptional()
  @IsString({ message: 'Explanation must be a string' })
  explanation?: string;

  @IsOptional()
  @IsString({ message: 'Correct answer must be a string' })
  correctAnswer?: string;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
