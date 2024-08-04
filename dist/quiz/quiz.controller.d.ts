import { Response } from 'express';
import { QuizService } from './quiz.service';
import { CreateQuizDto, UpdateQuizDto } from './quiz.dto';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    create(createQuizDto: CreateQuizDto, response: Response): Promise<Response<any, Record<string, any>>>;
    findAll(response: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateQuizDto: UpdateQuizDto, response: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
}
