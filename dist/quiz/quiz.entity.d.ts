import { Question } from '../question/question.entity';
import { Users } from '../user/user.entity';
export declare class Quiz {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    duration: number;
    isPublished: boolean;
    difficulty: string;
    instruction: string;
    isRandomized: boolean;
    createdById: string;
    questions: Question[];
    createdBy: Users;
}
