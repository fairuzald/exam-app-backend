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
import { QuestionOptionService } from './question-option.service';
import {
  CreateQuestionOptionDto,
  UpdateQuestionOptionDto,
} from './question-option.dto';
import { Response } from 'express';

@Controller('question-options')
export class QuestionOptionController {
  constructor(private readonly questionOptionService: QuestionOptionService) {}

  //   Create a new question option
  @Post()
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

  //   Get all question options
  @Get()
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

  //   Get a single question option
  @Get(':id')
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

  //   Update a question option
  @Put(':id')
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
