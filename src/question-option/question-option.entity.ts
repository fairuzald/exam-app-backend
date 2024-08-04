import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from '../question/question.entity';

@Entity()
export class QuestionOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'char', length: 1 })
  alphabet: string;

  @Column({ type: 'text', nullable: true })
  optionText: string;

  @Column({ type: 'int' })
  points: number;

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  question: Question;

  @Column({ type: 'uuid' })
  questionId: string;
}
