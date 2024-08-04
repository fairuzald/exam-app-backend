import { Repository } from 'typeorm';
import { QuestionOption } from './question-option.entity';
import { CreateQuestionOptionDto, UpdateQuestionOptionDto } from './question-option.dto';
export declare class QuestionOptionService {
    private questionOptionRepository;
    constructor(questionOptionRepository: Repository<QuestionOption>);
    create(createQuestionOptionDto: CreateQuestionOptionDto): Promise<{
        data: QuestionOption;
        message: string;
    }>;
    findAll(): Promise<{
        data: QuestionOption[];
        message: string;
    }>;
    findOne(id: string): Promise<{
        data: QuestionOption;
        message: string;
    }>;
    update(id: string, updateQuestionOptionDto: UpdateQuestionOptionDto): Promise<{
        data: QuestionOption;
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
