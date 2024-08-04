import { QuestionType } from './question.entity';
export declare class CreateQuestionDto {
    questionText: string;
    questionType: QuestionType;
    maxPoints?: number;
    explanation?: string;
    correctAnswer?: string;
    quizId: string;
}
declare const UpdateQuestionDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateQuestionDto>>;
export declare class UpdateQuestionDto extends UpdateQuestionDto_base {
}
export {};
