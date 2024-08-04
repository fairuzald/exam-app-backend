import { Quiz } from '../quiz/quiz.entity';
export declare enum UserRole {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    ADMIN = "ADMIN"
}
export declare class Users {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    quizzes: Quiz[];
}
