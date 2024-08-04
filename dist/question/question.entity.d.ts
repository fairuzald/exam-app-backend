import { QuestionOption } from '../question-option/question-option.entity';
import { Quiz } from '../quiz/quiz.entity';
export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer' | 'essay' | 'checkbox';
export declare class Question {
    id: string;
    questionText: string;
    questionType: QuestionType;
    maxPoints?: number;
    explanation?: string;
    correctAnswer?: string;
    quizId: string;
    options?: QuestionOption[];
    quiz: Quiz;
}
