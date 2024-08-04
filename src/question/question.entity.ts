import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuestionOption } from '../question-option/question-option.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  question: string;

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
  questionType:
    | 'multiple-choice'
    | 'true-false'
    | 'short-answer'
    | 'essay'
    | 'checkbox';

  @Column({ type: 'int' })
  maxPoints: number;

  @Column({ type: 'text', nullable: true })
  explanation?: string;

  @Column({ type: 'text', nullable: true })
  correctAnswer?: string;

  @OneToMany(() => QuestionOption, (option) => option.question)
  options?: QuestionOption[];
}
