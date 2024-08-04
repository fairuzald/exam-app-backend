import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  NotFoundException,
} from '@nestjs/common';

import { Response } from 'express';
import { QuestionService } from './question.service';
import { CreateQuestionDto, UpdateQuestionDto } from './question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  //   Create a new question
  @Post()
  async create(
    @Body() createQuestionOptionDto: CreateQuestionDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.questionService.create(createQuestionOptionDto);
      return response.status(201).json(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(400).json({ message: error.message });
    }
  }

  //   Get all question
  @Get()
  async findAll(@Res() response: Response) {
    try {
      const res = await this.questionService.findAll();
      return response.status(200).json(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(400).json({ message: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const res = await this.questionService.findOne(id);
      return response.status(200).json(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(400).json({ message: error.message });
    }
  }

  //   Update a question
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionOptionDto: UpdateQuestionDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.questionService.update(
        id,
        updateQuestionOptionDto,
      );
      return response.status(200).json(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(400).json({ message: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.questionService.remove(id);

      return response.status(200).json(result);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(400).json({ message: error.message });
    }
  }
}
