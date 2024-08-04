import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../user.entity';

export class TokenSender {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public sendToken(user: Users) {
    // Create access token
    const accessToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '15m',
      },
    );

    // Create refresh token that expires in 7 days
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      },
    );

    return { user, accessToken, refreshToken };
  }
}
