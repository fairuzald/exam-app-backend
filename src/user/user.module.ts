import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Users } from './user.entity';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), EmailModule],
  providers: [UserService, EmailService, ConfigService, JwtService, Repository],
  controllers: [UserController],
})
export class UserModule {}
