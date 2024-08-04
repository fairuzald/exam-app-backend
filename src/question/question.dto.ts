import {
  IsString,
  IsEnum,
  IsInt,
  IsOptional,
  IsNotEmpty,
  Min,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { QuestionType } from './question.entity';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The text of the question',
    example: 'What is the capital of France?',
  })
  @IsString({ message: 'Question must be a string' })
  @IsNotEmpty({ message: 'Question is required' })
  questionText: string;

  @ApiProperty({
    description: 'The type of the question',
    enum: [
      'multiple-choice',
      'true-false',
      'short-answer',
      'essay',
      'checkbox',
    ],
  })
  @IsEnum(
    ['multiple-choice', 'true-false', 'short-answer', 'essay', 'checkbox'],
    { message: 'Invalid question type' },
  )
  questionType: QuestionType;

  @ApiPropertyOptional({
    description: 'The maximum points that can be awarded for this question',
    example: 10,
  })
  @IsInt({ message: 'Max points must be an integer' })
  @Min(0, { message: 'Max points must be greater than or equal to 0' })
  @IsOptional()
  maxPoints?: number;

  @ApiPropertyOptional({
    description: 'Explanation of the correct answer',
  })
  @IsOptional()
  @IsString({ message: 'Explanation must be a string' })
  explanation?: string;

  @ApiPropertyOptional({
    description: 'The correct answer to the question',
  })
  @IsOptional()
  @IsString({ message: 'Correct answer must be a string' })
  correctAnswer?: string;

  @ApiProperty({
    description: 'ID of the quiz that this question belongs to',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Quiz ID is required' })
  quizId: string;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
