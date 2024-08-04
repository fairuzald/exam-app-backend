import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { QuestionOption } from '../question-option/question-option.entity';
import { Quiz } from '../quiz/quiz.entity';

export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'short-answer'
  | 'essay'
  | 'checkbox';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  questionText: string;

  @Column({
    type: 'enum',
    enum: [
      'multiple-choice',
      'true-false',
      'short-answer',
      'essay',
      'checkbox',
    ],
  })
  questionType: QuestionType;

  @Column({ type: 'int', nullable: true })
  maxPoints?: number;

  @Column({ type: 'text', nullable: true })
  explanation?: string;

  @Column({ type: 'text', nullable: true })
  correctAnswer?: string;

  @Column({ type: 'uuid' })
  quizId: string;

  @OneToMany(() => QuestionOption, (option) => option.question)
  options?: QuestionOption[];

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  quiz: Quiz;
}
