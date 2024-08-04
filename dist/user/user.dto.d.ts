import { UserRole } from './user.entity';
export declare class RegisterDto {
    name: string;
    username: string;
    email: string;
    password: string;
    role?: UserRole;
}
export declare class ActivationDto {
    activationToken: string;
    activationCode: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    activationToken: string;
    password: string;
}
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<RegisterDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
