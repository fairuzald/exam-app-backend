import {
  NotFoundException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { CreateQuizDto, UpdateQuizDto } from './quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  // Create a new question options
  async create(createQuizDto: CreateQuizDto): Promise<{
    data: Quiz;
    message: string;
  }> {
    const question = this.quizRepository.create(createQuizDto);
    const data = await this.quizRepository.save(question);
    if (!data) {
      throw new BadRequestException('Quiz not created');
    }
    return { data, message: 'Quiz created successfully' };
  }

  // Get all questions with options
  async findAll(): Promise<{
    data: Quiz[];
    message: string;
  }> {
    const data = await this.quizRepository.find({
      relations: ['questions', 'createdBy'],
    });
    if (!data) {
      throw new NotFoundException('No question found');
    }
    return { data, message: 'Questions fetched successfully' };
  }

  // get a single question options
  async findOne(id: string): Promise<{
    data: Quiz;
    message: string;
  }> {
    const data = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'createdBy'],
    });
    if (!data) {
      throw new NotFoundException('Quiz not found');
    }
    return { data, message: 'Quiz fetched successfully' };
  }

  // update a question options
  async update(
    id: string,
    updateQuizDto: UpdateQuizDto,
  ): Promise<{
    data: Quiz;
    message: string;
  }> {
    await this.quizRepository.update(id, updateQuizDto);
    const data = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'createdBy'],
    });

    if (!data) {
      throw new NotFoundException('Quiz not found');
    }
    return { data, message: 'Quiz updated successfully' };
  }

  async remove(id: string): Promise<{
    message: string;
  }> {
    const data = await this.quizRepository.delete(id);
    if (data.affected === 0) {
      throw new NotFoundException('Quiz not deleted');
    }
    return { message: 'Quiz deleted successfully' };
  }
}
