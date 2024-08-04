import { UserService } from './user.service';
import { RegisterDto, ActivationDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, UpdateUserDto } from './user.dto';
import { Response, Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerDto: RegisterDto, response: Response): Promise<Response<any, Record<string, any>>>;
    activateUser(activationDto: ActivationDto, response: Response): Promise<Response<any, Record<string, any>>>;
    login(loginDto: LoginDto, response: Response): Promise<Response<any, Record<string, any>>>;
    getLoggedInUser(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto, response: Response): Promise<Response<any, Record<string, any>>>;
    resetPassword(resetPasswordDto: ResetPasswordDto, response: Response): Promise<Response<any, Record<string, any>>>;
    logout(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    findAllUsers(response: Response): Promise<Response<any, Record<string, any>>>;
    updateUser(updateDto: UpdateUserDto, request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
