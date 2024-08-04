import { Module } from '@nestjs/common';
import { QuestionOptionService } from './question-option.service';
import { QuestionOptionController } from './question-option.controller';
import { QuestionOption } from './question-option.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionOption])],
  providers: [QuestionOptionService],
  controllers: [QuestionOptionController],
})
export class QuestionOptionModule {}
