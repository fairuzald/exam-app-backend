import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto, UpdateQuestionDto } from './question.dto';
export declare class QuestionService {
    private questionRepository;
    constructor(questionRepository: Repository<Question>);
    create(createQuestionDto: CreateQuestionDto): Promise<{
        data: Question;
        message: string;
    }>;
    findAll(): Promise<{
        data: Question[];
        message: string;
    }>;
    findOne(id: string): Promise<{
        data: Question;
        message: string;
    }>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<{
        data: Question;
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
