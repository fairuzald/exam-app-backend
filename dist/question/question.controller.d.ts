import { Response } from 'express';
import { QuestionService } from './question.service';
import { CreateQuestionDto, UpdateQuestionDto } from './question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(createQuestionDto: CreateQuestionDto, response: Response): Promise<Response<any, Record<string, any>>>;
    findAll(response: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateQuestionDto: UpdateQuestionDto, response: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
}
