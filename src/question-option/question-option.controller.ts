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
import { QuestionOptionService } from './question-option.service';
import {
  CreateQuestionOptionDto,
  UpdateQuestionOptionDto,
} from './question-option.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('question-options')
@Controller('question-options')
export class QuestionOptionController {
  constructor(private readonly questionOptionService: QuestionOptionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question option' })
  @ApiResponse({
    status: 201,
    description: 'Question option created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(
    @Body() createQuestionOptionDto: CreateQuestionOptionDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.questionOptionService.create(
        createQuestionOptionDto,
      );
      return response.status(201).json(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(400).json({ message: error.message });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all question options' })
  @ApiResponse({ status: 200, description: 'Retrieved all question options.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findAll(@Res() response: Response) {
    try {
      const res = await this.questionOptionService.findAll();
      return response.status(200).json(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(400).json({ message: error.message });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single question option by ID' })
  @ApiResponse({ status: 200, description: 'Retrieved the question option.' })
  @ApiResponse({ status: 404, description: 'Question option not found.' })
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const res = await this.questionOptionService.findOne(id);
      return response.status(200).json(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(400).json({ message: error.message });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a question option by ID' })
  @ApiResponse({
    status: 200,
    description: 'Question option updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Question option not found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async update(
    @Param('id') id: string,
    @Body() updateQuestionOptionDto: UpdateQuestionOptionDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.questionOptionService.update(
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
  @ApiOperation({ summary: 'Delete a question option by ID' })
  @ApiResponse({
    status: 200,
    description: 'Question option deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Question option not found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.questionOptionService.remove(id);
      return response.status(200).json(result);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(400).json({ message: error.message });
    }
  }
}
