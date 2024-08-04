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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiResponse({ status: 201, description: 'Quiz created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
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

  @Get()
  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiResponse({ status: 200, description: 'Quizzes retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
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
  @ApiOperation({ summary: 'Get a quiz by ID' })
  @ApiResponse({ status: 200, description: 'Quiz retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
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

  @Put(':id')
  @ApiOperation({ summary: 'Update a quiz by ID' })
  @ApiResponse({ status: 200, description: 'Quiz updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
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
  @ApiOperation({ summary: 'Delete a quiz by ID' })
  @ApiResponse({ status: 200, description: 'Quiz deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
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
