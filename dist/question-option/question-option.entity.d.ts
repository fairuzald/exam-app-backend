import { Question } from '../question/question.entity';
export declare class QuestionOption {
    id: string;
    alphabet: string;
    optionText: string;
    points: number;
    question: Question;
    questionId: string;
}
