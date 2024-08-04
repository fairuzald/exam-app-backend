import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Users } from '../user.entity';
import { Repository } from 'typeorm';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly userRepository;
    private readonly config;
    constructor(jwtService: JwtService, userRepository: Repository<Users>, config: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private validateAndSetUser;
    private updateAccessToken;
}
