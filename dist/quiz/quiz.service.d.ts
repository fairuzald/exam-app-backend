import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { CreateQuizDto, UpdateQuizDto } from './quiz.dto';
export declare class QuizService {
    private quizRepository;
    constructor(quizRepository: Repository<Quiz>);
    create(createQuizDto: CreateQuizDto): Promise<{
        data: Quiz;
        message: string;
    }>;
    findAll(): Promise<{
        data: Quiz[];
        message: string;
    }>;
    findOne(id: string): Promise<{
        data: Quiz;
        message: string;
    }>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<{
        data: Quiz;
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
