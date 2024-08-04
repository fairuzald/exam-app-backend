import {
  IsString,
  IsEnum,
  IsInt,
  IsOptional,
  IsNotEmpty,
  Min,
  IsUUID,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { QuestionType } from './question.entity';
export class CreateQuestionDto {
  @IsString({ message: 'Question must be a string' })
  @IsNotEmpty({ message: 'Question is required' })
  questionText: string;

  @IsEnum(
    ['multiple-choice', 'true-false', 'short-answer', 'essay', 'checkbox'],
    { message: 'Invalid question type' },
  )
  questionType: QuestionType;

  @IsInt({ message: 'Max points must be an integer' })
  @Min(0, { message: 'Max points must be greater than or equal to 0' })
  @IsOptional()
  maxPoints?: number;

  @IsOptional()
  @IsString({ message: 'Explanation must be a string' })
  explanation?: string;

  @IsOptional()
  @IsString({ message: 'Correct answer must be a string' })
  correctAnswer?: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Quiz ID is required' })
  quizId: string;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
