import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Users } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const accessToken = req.headers.accesstoken as string;
    const refreshToken = req.headers.refreshtoken as string;

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('Please login to access this resource!');
    }

    await this.validateAndSetUser(accessToken, req);

    await this.updateAccessToken(req);

    return true;
  }

  private async validateAndSetUser(token: string, req: any): Promise<void> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
      });

      const expirationTime = decoded.exp * 1000;
      if (expirationTime < Date.now()) {
        throw new UnauthorizedException('Access token has expired!');
      }

      req.user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private async updateAccessToken(req: any): Promise<void> {
    try {
      const refreshToken = req.headers.refreshtoken as string;
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
      });

      const expirationTime = decoded.exp * 1000;
      if (expirationTime < Date.now()) {
        throw new UnauthorizedException('Refresh token has expired!');
      }

      const user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new UnauthorizedException('Users not found!');
      }

      const newAccessToken = this.jwtService.sign(
        { id: user.id },
        {
          secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: '5m',
        },
      );

      const newRefreshToken = this.jwtService.sign(
        { id: user.id },
        {
          secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      );
      req.accesstoken = newAccessToken;
      req.refreshtoken = newRefreshToken;
      req.user = user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
