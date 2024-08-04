import { Repository } from 'typeorm';
import { Users, UserRole } from './user.entity';
import { RegisterDto, ActivationDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, UpdateUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './email/email.service';
import { ConfigService } from '@nestjs/config';
interface UserData {
    name: string;
    username: string;
    password: string;
    email: string;
    role: UserRole;
}
export declare class UserService {
    private userRepository;
    private readonly jwtService;
    private readonly emailService;
    private readonly configService;
    constructor(userRepository: Repository<Users>, jwtService: JwtService, emailService: EmailService, configService: ConfigService);
    createActivationToken(user: UserData): Promise<{
        token: string;
        activationCode: string;
    }>;
    generateForgotPassLink(user: Users): Promise<string>;
    register(registerDto: RegisterDto): Promise<{
        data: {
            activation_token: string;
        };
        message: string;
    }>;
    activateUser(activationDto: ActivationDto): Promise<{
        data: {
            id: string;
            name: string;
            username: string;
            email: string;
            role: UserRole;
            createdAt: Date;
            updatedAt: Date;
            quizzes: import("../quiz/quiz.entity").Quiz[];
        };
        message: string;
    }>;
    login(LoginDto: LoginDto): Promise<{
        data: {
            user: {
                name: string;
                email: string;
                username: string;
                role: UserRole;
            };
            accessToken: string;
            refreshToken: string;
        };
        message: string;
    }>;
    getLoggedInUser(req: any): Promise<{
        data: any;
        message: string;
    }>;
    forgotPassword(forgotPassDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
    findAllUsers(): Promise<{
        data: {
            id: string;
            name: string;
            username: string;
            email: string;
            role: UserRole;
            createdAt: Date;
            updatedAt: Date;
            quizzes: import("../quiz/quiz.entity").Quiz[];
        }[];
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        data: {
            password: any;
            id: string;
            name: string;
            username: string;
            email: string;
            role: UserRole;
            createdAt: Date;
            updatedAt: Date;
            quizzes: import("../quiz/quiz.entity").Quiz[];
        } & Users;
        message: string;
    }>;
    updateUser(updateDto: UpdateUserDto, req: any): Promise<{
        data: {
            updated: {
                name: string;
                username: string;
                email: string;
                password: string;
                role: UserRole;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                quizzes: import("../quiz/quiz.entity").Quiz[];
            } & Users;
        };
        message: string;
    }>;
}
export {};
