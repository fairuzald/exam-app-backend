// src/question-option/question-option.service.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionOption } from './question-option.entity';
import {
  CreateQuestionOptionDto,
  UpdateQuestionOptionDto,
} from './question-option.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class QuestionOptionService {
  constructor(
    @InjectRepository(QuestionOption)
    private questionOptionRepository: Repository<QuestionOption>,
  ) {}

  // Create a new question option
  async create(createQuestionOptionDto: CreateQuestionOptionDto): Promise<{
    data: QuestionOption;
    message: string;
  }> {
    const questionOption = this.questionOptionRepository.create(
      createQuestionOptionDto,
    );
    const data = await this.questionOptionRepository.save(questionOption);
    if (!data) {
      throw new BadRequestException('Question option not created');
    }
    return { data, message: 'Question option created successfully' };
  }

  // get all question options
  async findAll(): Promise<{
    data: QuestionOption[];
    message: string;
  }> {
    const data = await this.questionOptionRepository.find();
    if (!data) {
      throw new NotFoundException('No question options found');
    }
    return { data, message: 'Question options fetched successfully' };
  }

  // get a single question option
  async findOne(id: string): Promise<{
    data: QuestionOption;
    message: string;
  }> {
    const data = await this.questionOptionRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException('Question option not found');
    }
    return { data, message: 'Question option fetched successfully' };
  }

  // update a question option
  async update(
    id: string,
    updateQuestionOptionDto: UpdateQuestionOptionDto,
  ): Promise<{
    data: QuestionOption;
    message: string;
  }> {
    await this.questionOptionRepository.update(id, updateQuestionOptionDto);
    const data = await this.questionOptionRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException('Question option not updated');
    }
    return { data, message: 'Question option updated successfully' };
  }

  async remove(id: string): Promise<{
    message: string;
  }> {
    const data = await this.questionOptionRepository.delete(id);
    if (data.affected === 0) {
      throw new NotFoundException('Question option not deleted');
    }
    return { message: 'Question option deleted successfully' };
  }
}
