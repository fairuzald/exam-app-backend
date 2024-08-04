import { Response } from 'express';
import { QuestionOptionService } from './question-option.service';
import { CreateQuestionOptionDto, UpdateQuestionOptionDto } from './question-option.dto';
export declare class QuestionOptionController {
    private readonly questionOptionService;
    constructor(questionOptionService: QuestionOptionService);
    create(createQuestionOptionDto: CreateQuestionOptionDto, response: Response): Promise<Response<any, Record<string, any>>>;
    findAll(response: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateQuestionOptionDto: UpdateQuestionOptionDto, response: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
}
