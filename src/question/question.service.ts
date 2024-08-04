// src/question-options/question-options.service.ts
import {
  NotFoundException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto, UpdateQuestionDto } from './question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  // Create a new question options
  async create(createQuestionDto: CreateQuestionDto): Promise<{
    data: Question;
    message: string;
  }> {
    const question = this.questionRepository.create(createQuestionDto);
    const data = await this.questionRepository.save(question);
    if (!data) {
      throw new BadRequestException('Question not created');
    }
    return { data, message: 'Question created successfully' };
  }

  // Get all questions with options
  async findAll(): Promise<{
    data: Question[];
    message: string;
  }> {
    const data = await this.questionRepository.find({
      relations: ['options'],
    });
    if (!data) {
      throw new NotFoundException('No question found');
    }
    return { data, message: 'Questions fetched successfully' };
  }

  // get a single question options
  async findOne(id: string): Promise<{
    data: Question;
    message: string;
  }> {
    const data = await this.questionRepository.findOne({
      where: { id },
      relations: ['options'],
    });
    if (!data) {
      throw new NotFoundException('Question not found');
    }
    return { data, message: 'Question fetched successfully' };
  }

  // update a question options
  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<{
    data: Question;
    message: string;
  }> {
    await this.questionRepository.update(id, updateQuestionDto);
    const data = await this.questionRepository.findOne({
      where: { id },
      relations: ['options'],
    });

    if (!data) {
      throw new NotFoundException('Question not found');
    }
    return { data, message: 'Question updated successfully' };
  }

  async remove(id: string): Promise<{
    message: string;
  }> {
    const data = await this.questionRepository.delete(id);
    if (data.affected === 0) {
      throw new NotFoundException('Question not deleted');
    }
    return { message: 'Question deleted successfully' };
  }
}
