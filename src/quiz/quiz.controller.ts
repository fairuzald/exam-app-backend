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
import { QuizService } from './quiz.service';
import { CreateQuizDto, UpdateQuizDto } from './quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  //   Create a new quiz
  @Post()
  async create(
    @Body() createQuizDto: CreateQuizDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.quizService.create(createQuizDto);
      return response.status(201).json(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(400).json({ message: error.message });
    }
  }

  //   Get all quiz
  @Get()
  async findAll(@Res() response: Response) {
    try {
      const res = await this.quizService.findAll();
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
      const res = await this.quizService.findOne(id);
      return response.status(200).json(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(400).json({ message: error.message });
    }
  }

  //   Update a quiz
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.quizService.update(id, updateQuizDto);
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
      const result = await this.quizService.remove(id);

      return response.status(200).json(result);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(400).json({ message: error.message });
    }
  }
}
