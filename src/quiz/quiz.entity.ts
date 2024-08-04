import { Question } from '../question/question.entity';
import { Users } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'int', default: 0 })
  duration: number;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Column({ type: 'enum', enum: ['easy', 'medium', 'hard'], default: 'easy' })
  difficulty: string;

  @Column({ type: 'text', nullable: true })
  instruction: string;

  @Column({ type: 'boolean', default: false })
  isRandomized: boolean;

  @Column({ type: 'uuid' })
  createdById: string;

  @OneToMany(() => Question, (question) => question.quiz, { cascade: true })
  questions: Question[];

  @ManyToOne(() => Users, (user) => user.quizzes, {
    nullable: false,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  createdBy: Users;
}
