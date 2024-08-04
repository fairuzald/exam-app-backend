import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../user.entity';
export declare class TokenSender {
    private readonly configService;
    private readonly jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    sendToken(user: Users): {
        user: Users;
        accessToken: string;
        refreshToken: string;
    };
}
